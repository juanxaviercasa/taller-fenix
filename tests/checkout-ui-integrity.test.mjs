import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const pay = readFileSync(new URL('../functions/api/checkout.ts', import.meta.url), 'utf8');

test('optional upsells are not selectable while checkout charges only the core workshop', () => {
  assert.match(app, /Complementos opcionales · En preparación/);
  assert.match(app, /type="checkbox"\s+disabled\s+checked=\{false\}/);
  assert.match(pay, /quantity: 1, currency_id: "PEN", unit_price: priceOf\(env\)/);
});

test('page does not advertise instant fulfillment or unconfigured payment methods', () => {
  assert.doesNotMatch(app, /⚡ Acceso Inmediato 24\/7|Pago 100% Seguro \(Yape \/ Tarjetas\)|Recibes tu acceso inmediato tras el pago/);
  assert.match(app, /Entrega coordinada después de verificar el pago/);
  assert.doesNotMatch(app, /Garantía Incondicional de 14 Días|Política de devolución garantizada/);
});
