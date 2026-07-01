import { expect, test } from '@playwright/test';

test.describe('Ranking de links orgânicos', () => {
  test('mostra ranking comercial por link e origem', async ({ page }) => {
    await page.addInitScript(() => {
      localStorage.setItem('adminToken', 'token-e2e');
      localStorage.setItem('adminAutenticado', 'true');
    });

    await page.route('**/*googletagmanager.com/**', (route) => route.abort());
    await page.route('**/*google-analytics.com/**', (route) => route.abort());
    await page.route('**/*facebook.net/**', (route) => route.abort());
    await page.route('**/*facebook.com/**', (route) => route.abort());

    await page.route('**/api/organic/get?days=7', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          days: 7,
          byAction: [
            { action_type: 'page_view', total: 52 },
            { action_type: 'form_submit', total: 6 },
            { action_type: 'whatsapp_click', total: 8 },
          ],
          bySource: [
            { source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', action_type: 'page_view', total: 20 },
            { source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', action_type: 'whatsapp_click', total: 5 },
            { source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', action_type: 'page_view', total: 32 },
            { source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', action_type: 'form_submit', total: 6 },
          ],
          byPage: [
            { page_path: '/planos/mei?origem=instagram_bio', source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', plan_type: 'MEI', action_type: 'page_view', total: 20 },
            { page_path: '/planos/mei?origem=instagram_bio', source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', plan_type: 'MEI', action_type: 'whatsapp_click', total: 5 },
            { page_path: '/planos/familiar?origem=whatsapp_status', source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', plan_type: 'Família', action_type: 'page_view', total: 32 },
            { page_path: '/planos/familiar?origem=whatsapp_status', source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', plan_type: 'Família', action_type: 'form_submit', total: 6 },
          ],
          recent: [],
          sessionOverview: {},
          topJourneys: [],
        }),
      });
    });

    await page.goto('/admin/links');

    await expect(page.getByRole('heading', { name: /ranking de links/i })).toBeVisible();
    await expect(page.getByText('/planos/familiar?origem=whatsapp_status')).toBeVisible();
    await expect(page.getByText('/planos/mei?origem=instagram_bio')).toBeVisible();
    await expect(page.getByText('WhatsApp Status')).toBeVisible();
    await expect(page.getByText('Instagram Bio')).toBeVisible();
    await expect(page.getByRole('link', { name: /abrir central/i })).toHaveAttribute('href', '/links');
    await expect(page.getByRole('link', { name: /radar orgânico/i })).toHaveAttribute('href', '/admin/organico');
  });
});
