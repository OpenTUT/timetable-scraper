import { readFileSync } from 'node:fs';
import { join } from 'node:path';

export function loadHTML(relativePath: string) {
  const html = readFileSync(join(import.meta.dirname, relativePath), 'utf-8');
  document.body.innerHTML = html;
}
