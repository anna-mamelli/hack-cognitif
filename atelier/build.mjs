// Builds the site at the root of the project from atelier/modele.html: one HTML file per view,
// per terrain and per fiche, each with its own title and description and its content already in
// the page (readable without JavaScript, indexable by search engines).
// The pages use ../style.css, ../tokens.css, ../base.css and ../script.js, which stay at the root.
//
// Usage, from the atelier folder: npm install (once), then npm run build.
// With the site's address, also writes sitemap.xml, robots.txt and canonical links:
//   PowerShell: $env:SITE_URL = "https://exemple.fr"; npm run build
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';

const ATELIER = dirname(fileURLToPath(import.meta.url));
const SITE = join(ATELIER, '..');
const TEMPLATE = join(ATELIER, 'modele.html');
const SITE_URL = (process.env.SITE_URL || '').replace(/\/+$/, '');
const CHROMES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
];

const chrome = CHROMES.find((p) => p && existsSync(p));
if (!chrome) {
  console.error('Chrome ou Edge introuvable : indiquez son chemin dans la variable CHROME_PATH.');
  process.exit(1);
}

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const fileOf = (route) => (route === 'accueil' ? 'index.html' : `${route}.html`);

const template = readFileSync(TEMPLATE, 'utf8');
const homeDescription = (template.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
// Reduced motion: the router then switches views at once, with no transition to wait for
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: 'load' });

const routes = await page.evaluate(() => window.HC_ROUTES);
const known = new Set(routes);

// The template's #view links become links between files (in-page anchors such as #main stay),
// and its ../ asset paths become paths from the root
const relink = (html) => html
  .replace(/href="#([^"]+)"/g, (m, id) => (known.has(id) ? `href="${fileOf(id)}"` : m))
  .replace(/(href|src)="\.\.\//g, '$1="')
  .replace(/\.\.\/images\//g, 'images/');

// Every HTML file at the root is a built page: clear them so a removed fiche leaves no page behind
for (const f of readdirSync(SITE)) if (f.endsWith('.html')) rmSync(join(SITE, f));

const pages = [];
for (const route of routes) {
  const snap = await page.evaluate(async (r) => {
    location.hash = r;
    await new Promise((res) => setTimeout(res, 120));
    const view = [...document.querySelectorAll('main > [id^="v-"]')].find((el) => !el.hidden);
    const clone = view.cloneNode(true);
    clone.removeAttribute('hidden');
    clone.querySelectorAll('.slider').forEach((s) => s.remove());
    clone.querySelectorAll('[data-at]').forEach((el) => el.removeAttribute('data-at'));
    clone.querySelectorAll('.swap, .moved').forEach((el) => el.classList.remove('swap', 'moved'));
    const text = (sel) => (view.querySelector(sel) || {}).textContent || '';
    const nav = document.querySelector('#nav a[aria-current="page"]');
    return { html: clone.outerHTML, h1: text('h1').trim(), lead: text('.lead').trim().replace(/\s+/g, ' '), current: nav ? nav.getAttribute('data-v') : '' };
  }, route);

  const title = route === 'accueil' ? 'Hack cognitif' : `${snap.h1} | Hack cognitif`;
  const description = route === 'accueil' ? homeDescription : (snap.lead || homeDescription);
  const file = fileOf(route);
  const url = SITE_URL ? `${SITE_URL}/${file === 'index.html' ? '' : file}` : '';

  let html = template
    .replace(/<meta name="robots" content="noindex">\r?\n/, '') // the template is kept out of search engines, the pages are not
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, [
      `<meta name="description" content="${escapeAttr(description)}">`,
      `<meta property="og:title" content="${escapeAttr(title)}">`,
      `<meta property="og:description" content="${escapeAttr(description)}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:locale" content="fr_FR">',
      ...(url ? [`<link rel="canonical" href="${url}">`, `<meta property="og:url" content="${url}">`] : []),
    ].join('\n'))
    .replace(/<main id="main">[\s\S]*<\/main>/, `<main id="main">\n${snap.html}\n</main>`)
    .replace('<body>', `<body data-page="${route}">`);
  if (snap.current) html = html.replace(`data-v="${snap.current}"`, `data-v="${snap.current}" aria-current="page"`);
  html = relink(html);

  writeFileSync(join(SITE, file), html);
  pages.push(url);
}
await browser.close();

if (SITE_URL) {
  const today = new Date().toISOString().slice(0, 10);
  writeFileSync(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

console.log(`${routes.length} pages écrites à la racine du site${SITE_URL ? ', avec sitemap.xml et robots.txt' : ' (sans sitemap : définir SITE_URL pour l\'ajouter)'}.`);
if (errors.length) {
  console.error(`Erreurs de script pendant la génération :\n${errors.join('\n')}`);
  process.exit(1);
}
