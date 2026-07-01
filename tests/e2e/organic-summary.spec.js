import { expect, test } from '@playwright/test';

async function prepareOrganicPage(page, summaries = [], sessions = []) {
  await page.addInitScript(() => {
    window.__openedUrls = [];
    window.open = (url) => {
      window.__openedUrls.push(String(url));
      return { closed: false, focus() {} };
    };
  });

  await page.route('**/*googletagmanager.com/**', (route) => route.abort());
  await page.route('**/*google-analytics.com/**', (route) => route.abort());
  await page.route('**/*facebook.net/**', (route) => route.abort());
  await page.route('**/*facebook.com/**', (route) => route.abort());
  await page.route('**/api/organic/summary', async (route) => {
    summaries.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
  await page.route('**/api/organic/session', async (route) => {
    sessions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true }),
    });
  });
}

async function fillMinimalLeadForm(form) {
  await form.getByPlaceholder('Seu nome').fill('Lead Resumo Orgânico');
  await form.getByPlaceholder('(21) 99999-9999').fill('21977776666');
  await form.getByPlaceholder('Rio de Janeiro, RJ').fill('Piabetá, RJ');
  await form.locator('select').first().selectOption({ label: 'Família' });
  await form.locator('select').nth(1).selectOption({ label: '3 a 5 vidas' });
  await form.locator('input[type="checkbox"]').check();
}

test.describe('Resumo orgânico', () => {
  test('registra visualização agregada com origem gratuita', async ({ page }) => {
    const summaries = [];
    const sessions = [];
    await prepareOrganicPage(page, summaries, sessions);

    await page.goto('/planos/mei?origem=whatsapp_status');

    await expect(page.locator('form.lead-capture').first()).toBeVisible();
    await expect.poll(() => summaries.length).toBeGreaterThan(0);
    await expect.poll(() => sessions.length).toBeGreaterThan(0);
    expect(summaries[0]).toMatchObject({
      action_type: 'page_view',
      page_path: '/planos/mei?origem=whatsapp_status',
      source_tag: 'whatsapp_status',
      source_channel: 'WhatsApp orgânico',
      plan_type: 'MEI',
      target_key: 'pagina',
    });
    expect(sessions[0]).toMatchObject({
      action_type: 'page_view',
      page_path: '/planos/mei?origem=whatsapp_status',
      source_tag: 'whatsapp_status',
      source_channel: 'WhatsApp orgânico',
      plan_type: 'MEI',
      target_key: 'pagina',
      page_depth: 1,
    });
    expect(sessions[0].session_key).toMatch(/^sess_/);
  });

  test('registra envio do formulário sem identificar visitante anônimo', async ({ page }) => {
    const summaries = [];
    const sessions = [];
    const leads = [];
    await prepareOrganicPage(page, summaries, sessions);

    await page.route('**/api/leads/create', async (route) => {
      leads.push(route.request().postDataJSON());
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, lead: { id: 1, status: 'Novo' } }),
      });
    });

    await page.goto('/?origem=instagram_bio');

    const form = page.locator('form.lead-capture').first();
    await fillMinimalLeadForm(form);
    await form.getByRole('button', { name: /quero minha cotação/i }).click();

    await expect(form.getByText(/lead salvo no painel/i)).toBeVisible();
    expect(leads).toHaveLength(1);
    expect(summaries).toContainEqual(expect.objectContaining({
      action_type: 'form_submit',
      source_tag: 'instagram_bio',
      source_channel: 'Instagram orgânico',
      plan_type: 'Família',
      target_key: 'formulario_cotacao',
    }));
  });

  test('registra clique no WhatsApp direto como métrica agregada', async ({ page }) => {
    const summaries = [];
    const sessions = [];
    await prepareOrganicPage(page, summaries, sessions);

    await page.goto('/planos/mei?origem=whatsapp_status');

    const popupPromise = page.waitForEvent('popup').catch(() => null);
    await page.getByRole('link', { name: /prefiro chamar direto no WhatsApp/i }).first().click();
    const popup = await popupPromise;
    await popup?.close();

    await expect.poll(() => summaries.some((item) => item.action_type === 'whatsapp_click')).toBe(true);
    expect(summaries).toContainEqual(expect.objectContaining({
      action_type: 'whatsapp_click',
      source_tag: 'whatsapp_status',
      source_channel: 'WhatsApp orgânico',
      plan_type: 'MEI',
      target_key: 'whatsapp_direto',
    }));
  });
});
