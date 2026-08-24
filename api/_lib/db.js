import { neon } from '@neondatabase/serverless';

export function getSqlClient() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) throw new Error('DATABASE_URL não configurada no ambiente');

  let normalizedUrl = String(databaseUrl).trim();
  if (
    (normalizedUrl.startsWith('"') && normalizedUrl.endsWith('"')) ||
    (normalizedUrl.startsWith("'") && normalizedUrl.endsWith("'"))
  ) {
    normalizedUrl = normalizedUrl.slice(1, -1);
  }

  const parsedUrl = new URL(normalizedUrl);
  parsedUrl.searchParams.delete('channel_binding');
  return neon(parsedUrl.toString());
}
