import { expect, test } from '@playwright/test';

const pages = [
  { path: '/planos/individual', heading: /plano de saúde individual/i, form: /quero cotação individual/i, type: 'Individual' },
  { path: '/planos/idoso', heading: /pessoa 59\+/i, form: /quero cotação para pessoa 59\+/i, type: 'Individual' },
  { path: '/planos/gestante', heading: /obstetrícia/i, form: /quero orientação para gestante/i, type: 'Família' },
  { path: '/plano-saude-mage', heading: /magé e região/i, form: /quero cotação em magé/i, city: 'Magé, RJ' },
  { path: '/plano-saude-piabeta', heading: /piabetá/i, form: /quero cotação em piabetá/i, city: 'Piabetá, RJ' },
];

test.describe('Páginas SEO locais e de intenção', () => {
  for (const item of pages) {
    test(`${item.path} renderiza formulário contextual`, async ({ page }) => {
      const summaries = [];

      await page.route('**/*googletagmanager.com/**', (route) => route.abort());
      await page.route('**/*google-analytics.com/**', (route) => route.abort());
      await page.route('**/*facebook.net/**', (route) => route.abort());
      await page.route('**/*facebook.com/**', (route) => route.abort());
      await page.route('**/api/organic/summary', async (route) => {
        summaries.push(route.request().postDataJSON());
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
      });
      await page.route('**/api/organic/session', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) }));

      await page.goto(`${item.path}?origem=google_perfil_empresa`);

      await expect(page.getByRole('heading', { name: item.heading })).toBeVisible();
      await expect(page.getByRole('heading', { name: item.form })).toBeVisible();
      await expect(page.locator('form.lead-capture').first()).toBeVisible();

      if (item.type) {
        await expect(page.locator('form.lead-capture select').first()).toHaveValue(item.type);
      }

      if (item.city) {
        await expect(page.getByPlaceholder('Rio de Janeiro, RJ')).toHaveValue(item.city);
      }

      await expect.poll(() => summaries.length).toBeGreaterThan(0);
      expect(summaries[0]).toMatchObject({
        action_type: 'page_view',
        page_path: `${item.path}?origem=google_perfil_empresa`,
        source_tag: 'google_perfil_empresa',
        source_channel: 'Google orgânico',
        target_key: 'pagina',
      });
    });
  }
});
