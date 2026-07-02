import { expect, test } from '@playwright/test';

const radarPayload = {
  prospects: [
    {
      id: 1,
      nome_empresa: 'Clínica Odonto Piabetá',
      segmento: 'odontologia',
      cidade: 'Piabetá',
      uf: 'RJ',
      telefone_publico: '21977776666',
      whatsapp: '21977776666',
      site_url: 'https://clinica.example.com',
      fonte_url: 'https://google.example/resultado',
      consulta_google: 'odontologia Piabetá RJ',
      origem: 'radarplan_google_browser',
      score: 96,
      prioridade: 'alta',
      score_motivos: 'google_browser, contato_encontrado, site_direto, segmento_confirmado',
      abordagem: 'Validar empresa local para plano empresarial.',
      status: 'Novo',
    },
    {
      id: 2,
      nome_empresa: 'Contabilidade Serra Verde',
      segmento: 'contabilidade',
      cidade: 'Magé',
      uf: 'RJ',
      telefone_publico: '',
      fonte_url: 'https://google.example/contabilidade',
      consulta_google: 'contabilidade Magé RJ',
      origem: 'radarplan',
      score: 68,
      prioridade: 'media',
      score_motivos: 'site_direto',
      status: 'Avaliar',
    },
  ],
  overview: { total: 2, alta: 1, novos: 1, convertidos: 0 },
  bySegment: [],
  byCity: [],
};

test.describe('Admin Radarplan', () => {
  test('mostra inteligência, prioridade e filtros de engenharia', async ({ page }) => {
    const updates = [];
    const conversions = [];

    await page.addInitScript(() => {
      localStorage.setItem('adminToken', 'token-e2e');
      localStorage.setItem('adminAutenticado', 'true');
    });

    await page.route('**/*googletagmanager.com/**', (route) => route.abort());
    await page.route('**/*google-analytics.com/**', (route) => route.abort());
    await page.route('**/api/radar?action=list', (route) => route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(radarPayload),
    }));
    await page.route('**/api/radar?action=update-status', async (route) => {
      updates.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true }) });
    });
    await page.route('**/api/radar?action=convert', async (route) => {
      conversions.push(route.request().postDataJSON());
      await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ success: true, lead_id: 99 }) });
    });

    await page.goto('/admin/radar');

    await expect(page.getByRole('heading', { level: 1, name: /radarplan b2b/i })).toBeVisible();
    await expect(page.getByLabel('Resumo Radarplan').getByText('Prospectos')).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Engenharia de triagem' })).toBeVisible();

    const odontoCard = page.getByRole('article').filter({ hasText: 'Clínica Odonto Piabetá' });
    await expect(odontoCard).toBeVisible();
    await expect(odontoCard.getByText('Prioridade Alta')).toBeVisible();
    await expect(odontoCard.getByText('Valor operacional')).toBeVisible();
    await expect(odontoCard.getByText('Próxima ação')).toBeVisible();
    await expect(odontoCard.getByText('Origem auditável')).toBeVisible();
    await expect(odontoCard.getByText('Contato público encontrado')).toBeVisible();

    await expect(page.getByRole('article').filter({ hasText: 'Contabilidade Serra Verde' })).toBeVisible();

    await page.getByRole('button', { name: 'odontologia' }).click();
    await expect(odontoCard).toBeVisible();
    await expect(page.getByRole('article').filter({ hasText: 'Contabilidade Serra Verde' })).toHaveCount(0);

    await page.getByLabel('Filtrar prioridade').selectOption('alta');
    await expect(odontoCard).toBeVisible();

    await page.getByRole('button', { name: 'Todos' }).first().click();
    await page.getByLabel('Filtrar prioridade').selectOption('todas');
    await odontoCard.getByRole('button', { name: 'Converter em lead' }).click();
    await expect.poll(() => conversions.length).toBe(1);
    expect(conversions[0]).toMatchObject({ id: 1 });
  });
});
