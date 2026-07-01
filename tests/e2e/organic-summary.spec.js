import { expect, test } from '@playwright/test';

test.describe('Resumo orgânico', () => {
  test('registra visualização agregada com origem gratuita', async ({ page }) => {
    const summaries = [];

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

    await page.goto('/planos/mei?origem=whatsapp_status');

    await expect(page.locator('form.lead-capture').first()).toBeVisible();
    await expect.poll(() => summaries.length).toBeGreaterThan(0);
    expect(summaries[0]).toMatchObject({
      action_type: 'page_view',
      page_path: '/planos/mei?origem=whatsapp_status',
      source_tag: 'whatsapp_status',
      source_channel: 'WhatsApp orgânico',
      plan_type: 'MEI',
      target_key: 'pagina',
    });
  });
});
