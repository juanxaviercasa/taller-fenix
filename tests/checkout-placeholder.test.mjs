import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const load = (p) => readFileSync(new URL('../' + p, import.meta.url), 'utf8');

test('el backend requiere activación explícita y secretos para recibir pagos', () => {
  const checkout = load('functions/api/checkout.ts');
  assert.match(checkout, /MP_CHECKOUT_ENABLED === "true"/);
  assert.match(checkout, /MP_ACCESS_TOKEN/);
  assert.match(checkout, /MP_WEBHOOK_SECRET/);
  assert.match(checkout, /validPrice\(priceOf\(env\)\)/);
});

test('el precio se configura desde el servidor y no desde el navegador', () => {
  const checkout = load('functions/api/checkout.ts');
  const button = load('src/components/PeruCheckoutButton.tsx');
  assert.match(checkout, /unit_price: priceOf\(env\)/);
  assert.match(button, /fetch\('\/api\/checkout', \{ method: 'POST' \}\)/);
  assert.doesNotMatch(button, /searchParams\.set\('total'/);
});

test('el checkout se deshabilita hasta configurar la cuenta', () => {
  const button = load('src/components/PeruCheckoutButton.tsx');
  assert.match(button, /disabled=\{!enabled \|\| busy\}/);
  assert.match(button, /Pago en preparación/);
});

test('el retorno no desbloquea acceso por estado en la URL', () => {
  const retorno = load('src/PaymentReturn.tsx');
  assert.match(retorno, /no es una confirmación de pago/);
  assert.doesNotMatch(retorno, /localStorage|sessionStorage|grantAccess|deliverCourse/);
});

test('no se publican credenciales en el repositorio', () => {
  const sample = load('.dev.vars.example');
  const ignore = load('.gitignore');
  assert.match(sample, /MP_CHECKOUT_ENABLED="false"/);
  assert.match(ignore, /\.dev\.vars/);
  assert.match(ignore, /\.env/);
  assert.doesNotMatch(sample, /APP_USR-[a-zA-Z0-9_-]{20,}/);
});

test('la primera prueba usa el precio comercial US$9', () => {
  const app = load('src/App.tsx');
  assert.match(app, /const checkoutTotal = 9/);
  assert.match(app, /VARIANTS\.creadores/);
  assert.doesNotMatch(app, /<AbTestingBar/);
});
