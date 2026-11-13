import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const domain = 'https://vibecoding.sistemazenit.com/';

test('robots.txt, sitemap.xml e index.html apuntan al dominio canónico vibecoding', () => {
  const robots = read('public/robots.txt');
  const sitemap = read('public/sitemap.xml');
  const html = read('index.html');
  assert.ok(robots.includes('Sitemap: ' + domain + 'sitemap.xml'));
  assert.ok(sitemap.includes('<loc>' + domain + '</loc>'));
  assert.ok(html.includes('<link rel="canonical" href="' + domain + '"'));
  assert.doesNotMatch(robots + sitemap, /bycoding\.systems\.mx\.com|\/pago/);
});

test('main.tsx y _headers no conservan rutas obsoletas de Mercado Pago', () => {
  const mainTsx = read('src/main.tsx');
  const headers = read('public/_headers');
  assert.doesNotMatch(mainTsx, /PaymentReturn|\/pago/);
  assert.doesNotMatch(headers, /\/pago/);
});

test('WaitlistForm no promete acceso inmediato ni pagos activos', () => {
  const form = read('src/components/WaitlistForm.tsx');
  assert.match(form, /Avisarme al abrir inscripciones/);
  assert.doesNotMatch(form, /acceso inmediato|Reclamar mi acceso|Reservando…|Mercado\s*Pago/i);
});
