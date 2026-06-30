import { expect, test } from '@playwright/test';

const routes = [
  { path: '/planos/mei', heading: /plano de saúde para mei/i, origin: 'pagina-mei', type: 'MEI' },
  { path: '/planos/familiar', heading: /plano de saúde para você e sua família/i, origin: 'pagina-familiar', type: 'Família' },
  { path: '/planos/empresarial', heading: /plano de saúde para pequena empresa/i, origin: 'pagina-empresarial', type: 'Empresa / PME' },
  { path: '/planos/portabilidade', heading: /quer trocar de plano/i, origin: 'pagina-portabilidade', type: 'Quero trocar meu plano atual' },
];

async function preparePage(page, submissions) {
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
    submissions.push(route.request().postDataJSON());
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, lead: { id: submissions.length } }),
    });
  });
}

test.describe('Páginas de dinheiro', () => {
  for (const route of routes) {
    test(`${route.path} renderiza e envia lead com origem correta`, async ({ page }) => {
      const submissions = [];
      await preparePage(page, submissions);

      await page.goto(route.path);

      await expect(page.getByRole('heading', { name: route.heading })).toBeVisible();

      const form = page.locator('form.lead-capture').first();
      await form.getByPlaceholder('Seu nome').fill('Lead Página Dinheiro');
      await form.getByPlaceholder('(21) 99999-9999').fill('21966665555');
      await form.locator('input[type="checkbox"]').check();
      await form.getByRole('button', { name: /quero cotar meu caso/i }).click();

      await expect(form.getByText(/lead salvo no painel/i)).toBeVisible();
      expect(submissions).toHaveLength(1);
      expect(submissions[0].origem).toBe(route.origin);
      expect(submissions[0].operadora).toBe(route.type);
      expect(submissions[0].mensagem).toContain('Página de origem:');
    });
  }
});
