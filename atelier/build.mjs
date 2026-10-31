// Builds the site at the root of the project from atelier/modele.html: one HTML file per view,
// per terrain and per fiche, each with its own title and description and its content already in
// the page (readable without JavaScript, indexable by search engines).
// The pages use ../style.css, ../tokens.css, ../base.css and ../script.js, which stay at the root.
//
// Usage, from the atelier folder: npm install (once), then npm run build.
// With the site's address (config.siteUrl in package.json, or the SITE_URL variable), also writes
// sitemap.xml, robots.txt, canonical links, share images and the structured data read by Google.
//
// dates.json keeps, for each page, a fingerprint of its content with the date it was first built
// and the date that content last changed: a rebuild that changes nothing keeps the dates.
import { readFileSync, writeFileSync, readdirSync, rmSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import puppeteer from 'puppeteer-core';

const ATELIER = dirname(fileURLToPath(import.meta.url));
const SITE = join(ATELIER, '..');
const TEMPLATE = join(ATELIER, 'modele.html');
const DATES = join(ATELIER, 'dates.json');
const config = JSON.parse(readFileSync(join(ATELIER, 'package.json'), 'utf8')).config || {};
const SITE_URL = (process.env.SITE_URL || config.siteUrl || '').replace(/\/+$/, '');
const SITE_NAME = 'Hack cognitif';
const HOME_TITLE = 'Hack cognitif : carte ouverte des vulnérabilités cognitives';
const SHARE = [['partage-16x9.jpg', 1200, 675], ['partage-4x3.jpg', 1200, 900], ['partage-1x1.jpg', 1200, 1200]];
const SHARE_ALT = 'Profil de tête et cerveau stylisés sur un fond de circuits imprimés.';
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
// Each page is written as route.html, but linked and declared without the extension: GitHub Pages
// serves fiches.html at .../fiches (script.js puts .html back in a local preview)
const fileOf = (route) => (route === 'accueil' ? 'index.html' : `${route}.html`);
const linkOf = (route) => (route === 'accueil' ? './' : route);
const urlOf = (route) => `${SITE_URL}/${route === 'accueil' ? '' : route}`;
const today = new Date().toLocaleDateString('sv-SE'); // local date, YYYY-MM-DD

const template = readFileSync(TEMPLATE, 'utf8');
const homeDescription = (template.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
const oldDates = existsSync(DATES) ? JSON.parse(readFileSync(DATES, 'utf8')) : {};
const dates = {};

const browser = await puppeteer.launch({ executablePath: chrome, headless: true });
const page = await browser.newPage();
// Wider than FOLD in script.js: what folds on a small screen must not enter the pages or their fingerprint
await page.setViewport({ width: 1280, height: 900 });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
// Reduced motion: the router then switches views at once, with no transition to wait for
await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.goto(pathToFileURL(TEMPLATE).href, { waitUntil: 'load' });

const routes = await page.evaluate(() => window.HC_ROUTES);
const known = new Set(routes);

// Shows a route in the template and returns its content. A fiche shows its update date when the
// page carries an article:modified_time meta, so the date is set before the view is drawn.
const render = (route, modified) => page.evaluate(async (r, d) => {
  let m = document.querySelector('meta[property="article:modified_time"]');
  if (d) {
    if (!m) { m = document.createElement('meta'); m.setAttribute('property', 'article:modified_time'); document.head.append(m); }
    m.content = d;
  } else if (m) m.remove();
  if (location.hash === `#${r}`) window.dispatchEvent(new HashChangeEvent('hashchange'));
  else location.hash = r;
  await new Promise((res) => setTimeout(res, 120));
  const view = [...document.querySelectorAll('main > [id^="v-"]')].find((el) => !el.hidden);
  const clone = view.cloneNode(true);
  clone.removeAttribute('hidden');
  clone.querySelectorAll('.slider').forEach((s) => s.remove());
  clone.querySelectorAll('[data-at]').forEach((el) => el.removeAttribute('data-at'));
  clone.querySelectorAll('.swap, .moved').forEach((el) => el.classList.remove('swap', 'moved'));
  // The fingerprint leaves out the update date itself and what is drawn at random on each visit (data-volatile)
  const bare = clone.cloneNode(true);
  bare.querySelectorAll('[data-maj], [data-volatile]').forEach((el) => el.remove());
  const text = (sel) => (view.querySelector(sel) || {}).textContent || '';
  const nav = document.querySelector('#nav a[aria-current="page"]');
  const type = [...view.querySelectorAll('.fmeta > div')].find((x) => x.querySelector('dt').textContent === 'Type');
  const refs = [...view.querySelectorAll('#s-refs .refs li')].map((li) => {
    const a = li.querySelector('a[href^="http"]');
    const c = li.cloneNode(true);
    c.querySelectorAll('a, .lv').forEach((x) => x.remove());
    return { name: c.textContent.replace(/\s+/g, ' ').trim(), url: a ? a.href : '' };
  });
  return {
    html: clone.outerHTML, bare: bare.outerHTML, fiche: view.id === 'v-fiche', billet: view.id === 'v-billet',
    date: (view.querySelector('time[data-pub]') || {}).dateTime || '',
    h1: text('h1').trim(), name: view.dataset.name || '', lead: text('.lead').trim().replace(/\s+/g, ' '),
    current: nav ? nav.getAttribute('data-v') : '', type: type ? type.querySelector('dd').textContent : '', refs,
  };
}, route, modified || '');

// The template's #view links become links between files (in-page anchors such as #main stay),
// and its ../ asset paths become paths from the root
const relink = (html) => html
  .replace(/href="#([^"]+)"/g, (m, id) => (known.has(id) ? `href="${linkOf(id)}"` : m))
  .replace(/(href|src)="\.\.\//g, '$1="')
  .replace(/\.\.\/images\//g, 'images/');

// Structured data (schema.org, JSON-LD): the site's name on the home page, a breadcrumb on every
// other page, and on each fiche an Article with its dates, image and references
const editor = () => ({ '@type': 'Organization', name: SITE_NAME, url: `${SITE_URL}/` });
const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
});
function structured(route, snap, name, description, url, d) {
  const home = ['Accueil', `${SITE_URL}/`];
  if (route === 'accueil') {
    return { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: 'fr-FR', description, publisher: editor() };
  }
  if (!snap.fiche && !snap.billet) return { '@context': 'https://schema.org', ...crumbs([home, [name, url]]) };
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: name,
        description,
        url,
        mainEntityOfPage: url,
        inLanguage: 'fr-FR',
        image: SHARE.map(([f]) => `${SITE_URL}/images/${f}`),
        datePublished: d.published,
        dateModified: d.modified,
        author: editor(),
        publisher: editor(),
        isPartOf: { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
        ...(snap.type ? { articleSection: snap.type } : {}),
        ...(snap.refs.length ? { citation: snap.refs.map((r) => ({ '@type': 'CreativeWork', name: r.name, ...(r.url ? { url: r.url } : {}) })) } : {}),
      },
      crumbs([home, snap.billet ? ['Blog', urlOf('blog')] : ['Fiches', urlOf('fiches')], [name, url]]),
    ],
  };
}

// Every HTML file at the root is a built page: clear them so a removed fiche leaves no page behind
for (const f of readdirSync(SITE)) if (f.endsWith('.html')) rmSync(join(SITE, f));

const pages = [];
for (const route of routes) {
  const before = oldDates[route];
  let snap = await render(route, before && before.modified);
  const hash = createHash('sha256').update(snap.bare).digest('hex').slice(0, 16);
  const d = { hash, published: snap.date || (before ? before.published : today), modified: before && before.hash === hash ? before.modified : today };
  if (snap.fiche && d.modified !== (before && before.modified)) snap = await render(route, d.modified);
  dates[route] = d;

  const name = snap.name || snap.h1;
  const title = route === 'accueil' ? HOME_TITLE : `${name} | ${SITE_NAME}`;
  const description = route === 'accueil' ? homeDescription : (snap.lead || homeDescription);
  const file = fileOf(route);
  const url = SITE_URL ? urlOf(route) : '';

  const head = [
    `<meta name="description" content="${escapeAttr(description)}">`,
    '<meta name="robots" content="max-image-preview:large">',
    `<meta property="og:site_name" content="${SITE_NAME}">`,
    `<meta property="og:title" content="${escapeAttr(title)}">`,
    `<meta property="og:description" content="${escapeAttr(description)}">`,
    `<meta property="og:type" content="${snap.fiche || snap.billet ? 'article' : 'website'}">`,
    '<meta property="og:locale" content="fr_FR">',
    ...(snap.fiche || snap.billet ? [`<meta property="article:published_time" content="${d.published}">`, `<meta property="article:modified_time" content="${d.modified}">`] : []),
    ...(url ? [
      `<link rel="canonical" href="${url}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${SITE_URL}/images/${SHARE[0][0]}">`,
      `<meta property="og:image:width" content="${SHARE[0][1]}">`,
      `<meta property="og:image:height" content="${SHARE[0][2]}">`,
      `<meta property="og:image:alt" content="${escapeAttr(SHARE_ALT)}">`,
      '<meta name="twitter:card" content="summary_large_image">',
    ] : []),
  ];
  const ld = url ? `<script type="application/ld+json">${JSON.stringify(structured(route, snap, name, description, url, d)).replace(/</g, '\\u003c')}</script>\n` : '';

  let html = template
    .replace(/<meta name="robots" content="noindex">\r?\n/, '') // the template is kept out of search engines, the pages are not
    // replacement functions, so that a $ in the content is never read as a pattern
    .replace(/<title>[^<]*<\/title>/, () => `<title>${escapeAttr(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, () => head.join('\n'))
    .replace('</head>', () => `${ld}</head>`)
    .replace(/<main id="main">[\s\S]*<\/main>/, () => `<main id="main">\n${snap.html}\n</main>`)
    .replace('<body>', `<body data-page="${route}">`);
  if (snap.current) html = html.replace(`data-v="${snap.current}"`, `data-v="${snap.current}" aria-current="page"`);
  html = relink(html);

  writeFileSync(join(SITE, file), html);
  pages.push([url, d.modified]);
}
await browser.close();
writeFileSync(DATES, `${JSON.stringify(dates, null, 2)}\n`);

if (SITE_URL) {
  writeFileSync(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(([u, m]) => `  <url><loc>${u}</loc><lastmod>${m}</lastmod></url>`).join('\n')}\n</urlset>\n`);
  writeFileSync(join(SITE, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
}

console.log(`${routes.length} pages écrites à la racine du site${SITE_URL ? ', avec données structurées, sitemap.xml et robots.txt' : " (sans adresse du site : renseigner config.siteUrl dans package.json pour ajouter données structurées et sitemap)"}.`);
if (errors.length) {
  console.error(`Erreurs de script pendant la génération :\n${errors.join('\n')}`);
  process.exit(1);
}
