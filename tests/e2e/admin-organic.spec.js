import { expect, test } from '@playwright/test';

test.describe('Admin orgânico', () => {
  test('mostra métricas orgânicas agregadas', async ({ page }) => {
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
            { action_type: 'page_view', total: 30 },
            { action_type: 'form_submit', total: 8 },
            { action_type: 'whatsapp_click', total: 4 },
          ],
          bySource: [
            { source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', action_type: 'page_view', total: 20 },
            { source_tag: 'whatsapp_status', source_channel: 'WhatsApp orgânico', action_type: 'form_submit', total: 6 },
            { source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', action_type: 'page_view', total: 10 },
            { source_tag: 'instagram_bio', source_channel: 'Instagram orgânico', action_type: 'whatsapp_click', total: 4 },
          ],
          byPage: [
            { page_path: '/planos/mei?origem=whatsapp_status', plan_type: 'MEI', action_type: 'page_view', total: 20 },
          ],
          recent: [
            { summary_day: '2026-06-30', action_type: 'form_submit', page_path: '/planos/mei?origem=whatsapp_status', source_tag: 'whatsapp_status', target_key: 'formulario_cotacao', total: 6 },
          ],
        }),
      });
    });

    await page.goto('/admin/organico');

    await expect(page.getByRole('heading', { name: /radar orgânico/i })).toBeVisible();
    await expect(page.getByText('whatsapp_status')).toBeVisible();
    await expect(page.getByText('Instagram orgânico')).toBeVisible();
    await expect(page.getByText('/planos/mei?origem=whatsapp_status')).toBeVisible();
    await expect(page.getByRole('link', { name: /voltar ao crm/i })).toHaveAttribute('href', '/admin');
  });
});
