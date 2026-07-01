import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const apiDir = join(process.cwd(), 'api');
const maxFunctions = 12;

function listServerlessFunctions(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name.startsWith('_')) return [];
      return listServerlessFunctions(fullPath);
    }

    if (!entry.isFile()) return [];
    if (!entry.name.endsWith('.js')) return [];

    const relative = fullPath.replace(`${process.cwd()}/`, '').replace(/\\/g, '/');
    const size = statSync(fullPath).size;
    return [{ path: relative, size }];
  });
}

const functions = listServerlessFunctions(apiDir).sort((a, b) => a.path.localeCompare(b.path));

console.log(`Vercel serverless functions: ${functions.length}/${maxFunctions}`);
functions.forEach((fn) => console.log(`- ${fn.path}`));

if (functions.length > maxFunctions) {
  console.error(`\nFunction budget exceeded. Hobby plan allows ${maxFunctions} serverless functions.`);
  console.error('Remove or merge API files before deploying.');
  process.exit(1);
}
