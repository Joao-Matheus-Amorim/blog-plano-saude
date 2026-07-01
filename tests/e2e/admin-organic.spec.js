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
          sessionOverview: {
            total_sessions: 18,
            high_intent_sessions: 7,
            whatsapp_sessions: 5,
            form_sessions: 4,
            avg_score: 62,
            avg_pages: 3.2,
          },
          topJourneys: [
            {
              source_tag: 'whatsapp_status',
              source_channel: 'WhatsApp orgânico',
              first_page: '/planos/mei?origem=whatsapp_status',
              last_page: '/planos/familiar?origem=whatsapp_status',
              plan_type: 'MEI',
              last_action: 'whatsapp_click',
              last_target: 'whatsapp_direto',
              total_sessions: 5,
              avg_score: 84,
              avg_pages: 3.4,
            },
          ],
        }),
      });
    });

    await page.goto('/admin/organico');

    await expect(page.getByRole('heading', { name: /radar orgânico/i })).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Jornada anônima' }).getByText('/planos/familiar?origem=whatsapp_status')).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Jornada anônima' }).getByText('84')).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Origem orgânica' }).getByRole('cell', { name: 'whatsapp_status' })).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Origem orgânica' }).getByText('Instagram orgânico')).toBeVisible();
    await expect(page.locator('section').filter({ hasText: 'Páginas e intenção' }).getByText('/planos/mei?origem=whatsapp_status')).toBeVisible();
    await expect(page.getByRole('link', { name: /voltar ao crm/i })).toHaveAttribute('href', '/admin');
  });
});
