import { expect, test } from '@playwright/test';

async function prepareLeadPage(page, submissions = []) {
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

  await page.route('**/api/leads/create', async (route) => {
    const request = route.request();
    submissions.push(request.postDataJSON());

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        lead: { id: submissions.length, status: 'Novo' },
        notifications: { whatsapp: false, meta_capi: false },
      }),
    });
  });
}

async function fillLeadForm(form, values = {}) {
  await form.getByPlaceholder('Seu nome').fill(values.nome || 'Lead Teste E2E');
  await form.getByPlaceholder('(21) 99999-9999').fill(values.telefone || '21999999999');

  const cidade = form.getByPlaceholder('Rio de Janeiro, RJ');
  if (await cidade.count()) {
    await cidade.fill(values.cidade || 'Magé, RJ');
  }

  const tipo = form.locator('select').first();
  if (await tipo.count()) {
    await tipo.selectOption({ label: values.tipo || 'MEI' });
  }

  const vidas = form.locator('select').nth(1);
  if (await vidas.count()) {
    await vidas.selectOption({ label: values.vidas || '2 vidas' });
  }

  const observacao = form.locator('textarea');
  if (await observacao.count()) {
    await observacao.fill(values.observacao || 'Teste automatizado do funil de lead.');
  }

  await form.locator('input[type="checkbox"]').check();
}

test.describe('Funil de lead', () => {
  test('home mostra oferta principal, cards de intenção e formulário', async ({ page }) => {
    const submissions = [];
    await prepareLeadPage(page, submissions);

    await page.goto('/');

    await expect(page.getByRole('heading', { name: /compare seu plano de saúde/i })).toBeVisible();
    await expect(page.getByText(/individual, família, mei ou empresa/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /tenho mei/i })).toHaveAttribute('href', '/planos/mei');
    await expect(page.locator('form.lead-capture').first()).toBeVisible();
  });

  test('home valida consentimento antes de enviar', async ({ page }) => {
    const submissions = [];
    await prepareLeadPage(page, submissions);

    await page.goto('/');

    const form = page.locator('form.lead-capture').first();
    await form.getByPlaceholder('Seu nome').fill('Lead Sem Consentimento');
    await form.getByPlaceholder('(21) 99999-9999').fill('21988887777');
    await form.getByRole('button', { name: /quero minha cotação/i }).click();

    await expect(form.getByText(/autoriza o contato por WhatsApp/i)).toBeVisible();
    expect(submissions).toHaveLength(0);
  });

  test('home salva lead, registra origem e abre WhatsApp', async ({ page }) => {
    const submissions = [];
    await prepareLeadPage(page, submissions);

    await page.goto('/');

    const form = page.locator('form.lead-capture').first();
    await fillLeadForm(form, {
      nome: 'Maria Funil',
      telefone: '21977776666',
      cidade: 'Piabetá, RJ',
      tipo: 'Família',
      vidas: '3 a 5 vidas',
      observacao: 'Quero plano familiar com boa rede.',
    });
    await form.getByRole('button', { name: /quero minha cotação/i }).click();

    await expect(form.getByText(/lead salvo no painel/i)).toBeVisible();
    expect(submissions).toHaveLength(1);
    expect(submissions[0]).toMatchObject({
      nome: 'Maria Funil',
      telefone: '21977776666',
      origem: 'home-cotacao',
    });
    expect(submissions[0].mensagem).toContain('Intenção: cotacao-principal');
    expect(submissions[0].mensagem).toContain('Cidade/UF: Piabetá, RJ');
    expect(submissions[0].mensagem).toContain('Tipo de plano: Família');

    const openedUrls = await page.evaluate(() => window.__openedUrls);
    expect(openedUrls.some((url) => url.startsWith('https://wa.me/5521977472141'))).toBe(true);
  });

  test('fallback abre WhatsApp mesmo se API falhar', async ({ page }) => {
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
    await page.route('**/api/leads/create', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'falha simulada' }),
      });
    });

    await page.goto('/');

    const form = page.locator('form.lead-capture').first();
    await fillLeadForm(form);
    await form.getByRole('button', { name: /quero minha cotação/i }).click();

    await expect(form.getByText(/não consegui registrar no painel agora/i)).toBeVisible();
    const openedUrls = await page.evaluate(() => window.__openedUrls);
    expect(openedUrls.some((url) => url.startsWith('https://wa.me/5521977472141'))).toBe(true);
  });
});
