import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const hotmart = readFileSync(new URL('../src/components/HotmartCheckoutButton.tsx', import.meta.url), 'utf8');
const privacy = readFileSync(new URL('../src/PrivacyPolicy.tsx', import.meta.url), 'utf8');

test('el precio de entrada es US$9 por 30 días y no mezcla otros métodos ni order bumps', () => {
  assert.match(app, /OFFICIAL_PRICE = 'US\$9'/);
  assert.match(app, /Pago único · acceso por 30 días/);
  assert.match(app, /HotmartCheckoutButton/);
  assert.doesNotMatch(
    app + hotmart + privacy,
    /Mercado\s*Pago|Mercado\s*Libre|mercadopago|Whop|Yape|S\/\s*34|S\/\s*35|orderBumps|selectedBumps|US\$197/i,
  );
});

test('no promete acceso automático ni cobros activos antes de configurar el checkout de Hotmart', () => {
  assert.doesNotMatch(app, /⚡ Acceso Inmediato 24\/7|Garantía Incondicional de 14 Días|Acceso inmediato tras el pago/);
  assert.match(hotmart, /Inscripción en Hotmart aún no habilitada/);
  assert.match(hotmart, /Todavía no se realiza ningún cobro/);
  assert.doesNotMatch(app, /SkoolCheckoutButton|SkooolCheckoutButton/);
});
