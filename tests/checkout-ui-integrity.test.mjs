import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const skool = readFileSync(new URL('../src/components/SkoolCheckoutButton.tsx', import.meta.url), 'utf8');
const privacy = readFileSync(new URL('../src/PrivacyPolicy.tsx', import.meta.url), 'utf8');

test('se establece US$9 como precio oficial único sin Mercado Pago, Whop ni order bumps', () => {
  assert.match(app, /OFFICIAL_PRICE = 'US\$9'/);
  assert.match(app, /Precio oficial/);
  assert.match(app, /SkoolCheckoutButton/);
  assert.doesNotMatch(
    app + skool + privacy,
    /Mercado\s*Pago|Mercado\s*Libre|mercadopago|Whop|Yape|S\/\s*34|S\/\s*35|orderBumps|selectedBumps|US\$197/i,
  );
});

test('no promete acceso automático ni cobros activos mientras la inscripción en Skool no está abierta', () => {
  assert.doesNotMatch(app, /⚡ Acceso Inmediato 24\/7|Garantía Incondicional de 14 Días|Acceso inmediato tras el pago/);
  assert.match(app, /Estamos terminando de abrir las inscripciones en Skool/);
  assert.match(skool, /Todavía no se realiza ningún cobro/);
  assert.doesNotMatch(app, /placeholder|checkout/);
});
