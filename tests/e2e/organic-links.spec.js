import { expect, test } from '@playwright/test';

test.describe('Central de links orgânicos', () => {
  test('mostra links rastreáveis e kit de distribuição', async ({ page }) => {
    const summaries = [];
    const sessions = [];

    await page.route('**/*googletagmanager.com/**', (route) => route.abort());
    await page.route('**/*google-analytics.com/**', (route) => route.abort());
    await page.route('**/*facebook.net/**', (route) => route.abort());
    await page.route('**/*facebook.com/**', (route) => route.abort());
    await page.route('**/api/organic/summary', async (route) => {
      summaries.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });
    await page.route('**/api/organic/session', async (route) => {
      sessions.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });

    await page.goto('/links?origem=instagram_bio');

    const bioCard = page.locator('aside.links-phone');
    await expect(page.getByRole('heading', { name: /central de links/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'WhatsApp Status' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Google Perfil da Empresa' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Radarplan B2B' })).toBeVisible();
    await expect(page.getByRole('link', { name: /^Abrir$/ }).nth(1)).toHaveAttribute('href', '/planos/mei?origem=links_organicos');
    await expect(page.locator('article.links-item').filter({ hasText: 'Plano para pessoa 59+' }).getByRole('link', { name: 'Abrir' })).toHaveAttribute('href', '/planos/idoso?origem=links_organicos');
    await expect(page.locator('article.links-item').filter({ hasText: 'Plano de saúde em Piabetá' }).getByRole('link', { name: 'Abrir' })).toHaveAttribute('href', '/plano-saude-piabeta?origem=links_organicos');
    await expect(bioCard.locator('code')).toHaveText('https://www.planosdesaudemaisavalentim.com.br/links?origem=instagram_bio');
    await expect.poll(() => summaries.length).toBeGreaterThan(0);
    await expect.poll(() => sessions.length).toBeGreaterThan(0);
    expect(summaries[0]).toMatchObject({
      action_type: 'page_view',
      page_path: '/links?origem=instagram_bio',
      source_tag: 'instagram_bio',
      source_channel: 'Instagram orgânico',
      target_key: 'pagina',
    });
  });

  test('copia texto pronto para uso orgânico', async ({ page }) => {
    await page.route('**/*googletagmanager.com/**', (route) => route.abort());
    await page.route('**/*google-analytics.com/**', (route) => route.abort());
    await page.route('**/api/organic/**', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));

    await page.goto('/links');
    await page.getByRole('button', { name: /copiar link da bio/i }).click();

    await expect(page.getByText(/copiado: link da bio/i)).toBeVisible();
  });
});
