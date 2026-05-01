import { parseJsonBody, rateLimit, signAdminToken, verifyAdminCredentials } from '../_lib/security.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  if (!rateLimit(req, res, { keyPrefix: 'admin-login', windowMs: 60_000, max: 8 })) {
    return;
  }

  const body = await parseJsonBody(req);
  const email = String(body.email || '').trim();
  const password = String(body.password || '');

  if (!email || !password) {
    return res.status(400).json({ error: 'Informe email e senha.' });
  }

  try {
    const ok = verifyAdminCredentials(email, password);

    if (!ok) {
      return res.status(401).json({ error: 'Credenciais inválidas.' });
    }

    const token = signAdminToken(email);

    return res.status(200).json({
      success: true,
      token,
      expiresInSeconds: 60 * 60 * 8,
    });
  } catch (error) {
    console.error('Erro no login admin:', error?.message || error);
    return res.status(500).json({
      error: 'Login indisponível. Verifique as variáveis de ambiente.',
    });
  }
}
