import { expect, test } from '@playwright/test';

const leads = [
  {
    id: 1,
    nome: 'Maria Teste',
    email: 'maria@example.com',
    telefone: '21977776666',
    operadora: 'Família',
    mensagem: 'Intenção: cotacao-principal\nCidade/UF: Piabetá, RJ',
    vidas: 3,
    origem: 'home-cotacao',
    status: 'Novo',
    observacao_interna: '',
    data_envio: '2026-06-30T10:00:00.000Z',
    ultima_acao_em: null,
  },
  {
    id: 2,
    nome: 'João Fechado',
    email: '',
    telefone: '21988887777',
    operadora: 'MEI',
    mensagem: 'Intenção: plano-mei',
    vidas: 2,
    origem: 'pagina-mei',
    status: 'Fechado',
    observacao_interna: 'Cliente fechou proposta.',
    data_envio: '2026-06-29T10:00:00.000Z',
    ultima_acao_em: '2026-06-30T12:00:00.000Z',
  },
];

async function prepareAdmin(page, patches = []) {
  let currentLeads = structuredClone(leads);

  await page.addInitScript(() => {
    localStorage.setItem('adminToken', 'fake-admin-token');
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

  await page.route('**/api/leads/get', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(currentLeads),
    });
  });

  await page.route('**/api/admin/blog/list', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([]),
    });
  });

  await page.route('**/api/leads/update-status', async (route) => {
    const patch = route.request().postDataJSON();
    patches.push(patch);

    currentLeads = currentLeads.map((lead) => {
      if (lead.id !== patch.id) return lead;
      return {
        ...lead,
        status: patch.status || lead.status,
        observacao_interna: typeof patch.observacao_interna === 'undefined' ? lead.observacao_interna : patch.observacao_interna,
        ultima_acao_em: '2026-06-30T13:00:00.000Z',
      };
    });

    const updated = currentLeads.find((lead) => lead.id === patch.id);

    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ success: true, lead: updated }),
    });
  });
}

test.describe('Admin CRM', () => {
  test('exibe fila, filtra status, abre WhatsApp e atualiza lead', async ({ page }) => {
    const patches = [];
    await prepareAdmin(page, patches);

    await page.goto('/admin');

    await expect(page.getByRole('heading', { name: /painel de vendas/i })).toBeVisible();
    await expect(page.getByText('Maria Teste')).toBeVisible();
    await expect(page.getByText('João Fechado')).toBeVisible();

    await page.getByRole('button', { name: /Fechado 1/i }).click();
    await expect(page.getByText('João Fechado')).toBeVisible();
    await expect(page.getByText('Maria Teste')).toHaveCount(0);

    await page.getByRole('button', { name: /Todos 2/i }).click();
    const mariaCard = page.locator('.crm-lead-card').filter({ hasText: 'Maria Teste' });

    await mariaCard.getByRole('button', { name: 'Abrir WhatsApp' }).click();
    const openedUrls = await page.evaluate(() => window.__openedUrls);
    expect(openedUrls.some((url) => url.startsWith('https://wa.me/5521977776666'))).toBe(true);

    await mariaCard.getByRole('button', { name: 'Chamado' }).click();
    expect(patches.at(-1)).toMatchObject({ id: 1, status: 'Chamado' });
    await expect(mariaCard.locator('.status-chip')).toContainText('Chamado');

    await mariaCard.locator('textarea.crm-note').fill('Chamou no WhatsApp e pediu retorno amanhã.');
    await mariaCard.getByRole('button', { name: /salvar observação/i }).click();
    expect(patches.at(-1)).toMatchObject({
      id: 1,
      observacao_interna: 'Chamou no WhatsApp e pediu retorno amanhã.',
    });
  });
});
