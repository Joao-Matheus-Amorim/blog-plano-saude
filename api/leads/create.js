import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const { nome, email, telefone, operadora, mensagem, vidas } = req.body;

  if (!nome || !String(nome).trim()) {
    return res.status(400).json({ error: 'Informe seu nome para continuar.' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const dataEnvio = new Date().toISOString();
    const result = await sql`
      INSERT INTO lead (nome, email, telefone, operadora, mensagem, vidas, data_envio)
      VALUES (${String(nome).trim()}, ${email || null}, ${telefone || null}, ${operadora || null}, ${mensagem || null}, ${vidas || null}, ${dataEnvio})
      RETURNING *
    `;

    const lead = result[0] || null;
    return res.status(201).json({
      success: true,
      lead: lead
        ? { ...lead, data_envio: lead.data_envio || dataEnvio }
        : null,
    });
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return res.status(500).json({
      error: 'Não foi possível registrar seu pedido agora. Tente novamente em instantes ou fale conosco pelo WhatsApp.',
    });
  }
}
