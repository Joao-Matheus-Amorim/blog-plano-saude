import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nome, email, telefone, operadora, mensagem, vidas } = req.body;

  if (!nome) {
    return res.status(400).json({ error: 'Nome obrigatório' });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const result = await sql`
      INSERT INTO lead (nome, email, telefone, operadora, mensagem, vidas)
      VALUES (${nome}, ${email || null}, ${telefone || null}, ${operadora || null}, ${mensagem || null}, ${vidas || null})
      RETURNING *
    `;
    return res.status(201).json(result[0]);
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    return res.status(500).json({ error: 'Erro ao criar lead' });
  }
}
