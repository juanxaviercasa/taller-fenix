import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const load = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');

test('los métodos de pago Mercado Pago y Whop fueron eliminados al no estar avanzados', () => {
  assert.equal(existsSync(new URL('../functions/api/checkout.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../functions/api/mercadopago-webhook.ts', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/components/PeruCheckoutButton.tsx', import.meta.url)), false);
  assert.equal(existsSync(new URL('../src/PaymentReturn.tsx', import.meta.url)), false);
  assert.equal(existsSync(new URL('../PAGOS_PERU.md', import.meta.url)), false);
});

test('el botón de Skool funciona como placeholder honesto y valida dominios skool.com HTTPS', () => {
  const button = load('src/components/SkoolCheckoutButton.tsx');
  assert.match(button, /skool\\\.com\$\/i/);
  assert.match(button, /protocol !== 'https:'/);
  assert.match(button, /disabled/);
  assert.match(button, /Checkout en Skool · Próximamente \(US\$9\)/);
  assert.match(button, /Todavía no se realiza ningún cobro/);
});

test('no se publican credenciales ni secretos en el repositorio', () => {
  const vars = load('.dev.vars.example');
  const ignore = load('.gitignore');
  assert.match(vars, /WAITLIST_ENABLED="false"/);
  assert.match(vars, /VITE_SKOOL_CHECKOUT_URL/);
  assert.match(ignore, /\.dev\.vars/);
  assert.match(ignore, /\.env/);
  assert.doesNotMatch(vars, /APP_USR-[a-zA-Z0-9_-]{20,}|MP_ACCESS_TOKEN/);
});
