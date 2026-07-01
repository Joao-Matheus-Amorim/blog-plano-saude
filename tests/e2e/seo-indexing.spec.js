import { expect, test } from '@playwright/test';

const productionDomain = 'https://consultoriadesaude.vercel.app';
const wrongDomain = 'https://www.planosdesaudemaisavalentim.com.br';
const requiredSitemapUrls = [
  '/',
  '/links',
  '/planos/mei',
  '/planos/familiar',
  '/planos/empresarial',
  '/planos/portabilidade',
  '/planos/individual',
  '/planos/idoso',
  '/planos/gestante',
  '/plano-saude-mage',
  '/plano-saude-piabeta',
];

test.describe('SEO técnico', () => {
  test('robots aponta para sitemap do domínio de produção', async ({ request }) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain(`Sitemap: ${productionDomain}/sitemap.xml`);
    expect(body).toContain('Disallow: /admin/');
    expect(body).not.toContain(wrongDomain);
  });

  test('sitemap lista páginas orgânicas e locais', async ({ request }) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();

    const body = await response.text();
    expect(body).toContain('<urlset');
    expect(body).not.toContain(wrongDomain);

    for (const path of requiredSitemapUrls) {
      expect(body).toContain(`<loc>${productionDomain}${path}</loc>`);
    }
  });
});
