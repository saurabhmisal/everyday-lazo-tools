// Static-only Firebase site; deliberately excludes source docs, Git metadata,
// production environment files, native installers and account/customer records.
import { cp, mkdir, rm, stat } from 'node:fs/promises';
import { resolve, join } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const out = join(root, '.firebase-dist');
const allowlist = [
  'index.html', 'script.js', 'styles.css', 'transition.css',
  'brand-theme.css', 'brand-type.css', 'analytics.js',
  'favicon.svg', 'favicon.ico', 'favicon-32.png', 'apple-touch-icon.png',
  'icon.png', 'assets'
];
await rm(out, {recursive:true,force:true});
await mkdir(out, {recursive:true});
for (const file of allowlist) {
  const from = join(root,file);
  await stat(from);
  await cp(from,join(out,file),{recursive:true});
}
console.log('Prepared a reviewed, static-only Everyday Firebase Hosting bundle');
