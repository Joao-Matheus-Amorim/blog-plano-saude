import { expect, test } from '@playwright/test';

const radarPayload = {
  prospects: [],
  overview: { total: 0, alta: 0, novos: 0, convertidos: 0 },
  bySegment: [],
  byCity: [],
};

async function mockAdmin(page) {
  await page.addInitScript(() => {
    localStorage.setItem('adminToken', 'token-e2e');
    localStorage.setItem('adminAutenticado', 'true');
  });

  await page.route('**/*googletagmanager.com/**', (route) => route.abort());
  await page.route('**/*google-analytics.com/**', (route) => route.abort());
  await page.route('**/api/leads/get', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.route('**/api/admin/blog/list', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: '[]' }));
  await page.route('**/api/radar?action=list', (route) => route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(radarPayload) }));
}

test.describe('Navegação administrativa responsiva', () => {
  test('permite navegar no desktop sem bloquear ações da página', async ({ page }) => {
    await page.setViewportSize({ width: 1366, height: 768 });
    await mockAdmin(page);

    await page.goto('/admin');

    const nav = page.getByRole('navigation', { name: 'Navegação administrativa' });
    await expect(nav).toBeVisible();
    await expect(nav.getByRole('link', { name: /radarplan prospectos/i })).toBeVisible();

    await page.getByRole('button', { name: 'Atualizar' }).click();
    await expect(page.getByRole('heading', { level: 2, name: 'Fila comercial' })).toBeVisible();

    await nav.getByRole('link', { name: /radarplan prospectos/i }).click();
    await expect(page).toHaveURL(/\/admin\/radar$/);
    await expect(page.getByRole('heading', { level: 1, name: /radarplan b2b/i })).toBeVisible();
  });

  test('mantém navegação clicável no mobile', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await mockAdmin(page);

    await page.goto('/admin');

    const nav = page.getByRole('navigation', { name: 'Navegação administrativa' });
    await expect(nav).toBeVisible();
    await nav.getByRole('link', { name: /radarplan prospectos/i }).click();
    await expect(page).toHaveURL(/\/admin\/radar$/);
    await expect(page.getByRole('heading', { level: 1, name: /radarplan b2b/i })).toBeVisible();
  });
});
