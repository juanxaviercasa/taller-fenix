import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const domain = 'https://vibecoding.sistemazenit.com/';

test('robots.txt and sitemap.xml point to the canonical educational domain', () => {
  const robots = read('public/robots.txt');
  const sitemap = read('public/sitemap.xml');
  const html = read('index.html');
  assert.ok(robots.includes('Sitemap: ' + domain + 'sitemap.xml'));
  assert.ok(sitemap.includes('<loc>' + domain + '</loc>'));
  assert.ok(html.includes('<link rel="canonical" href="' + domain + '"'));
  assert.doesNotMatch(robots + sitemap, /bycoding\.systems\.mx\.com/);
});

test('payment return leads to home instead of legacy variant', () => {
  const page = read('src/PaymentReturn.tsx');
  assert.match(page, /href="\/"/);
  assert.doesNotMatch(page, /href="\/bycoding"/);
  assert.match(page, /no es una confirmación de pago/);
});

test('registration does not promise immediate paid access', () => {
  const form = read('src/components/WaitlistForm.tsx');
  assert.match(form, /Avisarme al abrir inscripciones/);
  assert.doesNotMatch(form, /acceso inmediato|Reclamar mi acceso|Reservando…/);
  assert.match(read('public/_headers'), /X-Robots-Tag: noindex, nofollow/);
});

test('checkout validates its public site URL before showing ready', () => {
  const api = read('functions/api/checkout.ts');
  assert.match(api, /validSite\(env\.SITE_URL\)/);
  assert.match(api, /url\.protocol === 'https:'/);
});
