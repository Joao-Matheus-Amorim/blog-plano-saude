import { expect, test } from '@playwright/test';

const radarPayload = {
  prospects: [
    {
      id: 1,
      nome_empresa: 'Clínica Odonto Piabetá',
      segmento: 'odontologia',
      cidade: 'Piabetá',
      uf: 'RJ',
      cnpj: '12345678000190',
      cnae_codigo: '8630504',
      cnae_descricao: 'Atividade odontológica',
      porte_receita: 'ME',
      telefone_publico: '21977776666',
      whatsapp: '21977776666',
      site_url: 'https://clinica.example.com',
      fonte_url: 'https://google.example/resultado',
      consulta_google: 'odontologia Piabetá RJ',
      origem: 'radarplan_motor_v21',
      score: 148,
      prioridade: 'alta',
      nivel_maturidade: 5,
      nivel_label: 'Quente Agora',
      score_d1: 35,
      score_d2: 40,
      score_d3: 8,
      score_d4: 35,
      score_d5: 25,
      score_d6: 5,
      tem_vaga_ativa: true,
      score_motivos: 'google_browser, contato_encontrado, site_direto, segmento_confirmado, vaga_ativa',
      abordagem: 'Validar empresa local para plano empresarial.',
      proxima_acao: 'Abrir WhatsApp e fazer abordagem curta.',
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
      nivel_maturidade: 2,
      nivel_label: 'Pipeline Frio',
      score_motivos: 'site_direto',
      status: 'Avaliar',
    },
  ],
  overview: { total: 2, alta: 1, novos: 1, convertidos: 0, quentes: 1, com_vaga: 1 },
  bySegment: [],
  byCity: [],
};

test.describe('Admin Radarplan', () => {
  test('mostra inteligência V2, prioridade e filtros de engenharia', async ({ page }) => {
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
    await expect(odontoCard.getByText('/200', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Prioridade Alta', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('N5 Quente Agora', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Valor operacional', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Próxima ação', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Origem auditável', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('D1 Fonte', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('D2 Intenção', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Contato público encontrado', { exact: true })).toBeVisible();
    await expect(odontoCard.getByText('Sinal de contratação ou vaga', { exact: true })).toBeVisible();

    await expect(page.getByRole('article').filter({ hasText: 'Contabilidade Serra Verde' })).toBeVisible();

    const segmentFilter = page.locator('.radar-filter-grid > div').filter({ hasText: 'Segmento bruto' });
    await segmentFilter.getByRole('button', { name: 'odontologia', exact: true }).click();
    await expect(odontoCard).toBeVisible();
    await expect(page.getByRole('article').filter({ hasText: 'Contabilidade Serra Verde' })).toHaveCount(0);

    await page.getByLabel('Filtrar prioridade').selectOption('alta');
    await expect(odontoCard).toBeVisible();

    await segmentFilter.getByRole('button', { name: 'todos', exact: true }).click();
    await page.getByLabel('Filtrar prioridade').selectOption('todas');
    await odontoCard.getByRole('button', { name: 'Converter em lead', exact: true }).click();
    await expect.poll(() => conversions.length).toBe(1);
    expect(conversions[0]).toMatchObject({ id: 1 });
  });
});
