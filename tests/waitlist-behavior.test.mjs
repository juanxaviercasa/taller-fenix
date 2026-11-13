import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestGet, onRequestPost } from '../functions/api/waitlist.ts';
import { onRequestGet as checkoutStatus } from '../functions/api/checkout.ts';

const endpoint = 'https://vibecoding.sistemazenit.com/api/waitlist';
const request = (body, origin = 'https://vibecoding.sistemazenit.com') =>
  new Request(endpoint, { method: 'POST', headers: { Origin: origin }, body });

function mockDB() {
  const writes = [];
  const LEADS_DB = {
    prepare(sql) {
      return {
        bind(...values) {
          return { run: async () => { writes.push({ sql, values }); return { success: true }; } };
        },
      };
    },
  };
  return { LEADS_DB, writes };
}

test('inactive waitlist cannot accept registrations', async () => {
  const env = {};
  assert.deepEqual(await (await onRequestGet({ env })).json(), { available: false });
  const res = await onRequestPost({ env, request: request('{}') });
  assert.equal(res.status, 503);
});

test('invalid origin, missing consent and null JSON are rejected', async () => {
  const { LEADS_DB, writes } = mockDB();
  const env = { LEADS_DB, WAITLIST_ENABLED: 'true' };
  assert.equal((await onRequestPost({ env, request: request('{}', 'https://outside.example') })).status, 403);
  assert.equal((await onRequestPost({ env, request: request('null') })).status, 400);
  assert.equal((await onRequestPost({ env, request: request(JSON.stringify({ email: 'test@example.com' })) })).status, 400);
  assert.equal(writes.length, 0);
});

test('oversized body is rejected even without Content-Length', async () => {
  const { LEADS_DB, writes } = mockDB();
  const req = request(JSON.stringify({ junk: 'x'.repeat(5000) }));
  req.headers.delete('content-length');
  const res = await onRequestPost({ env: { LEADS_DB, WAITLIST_ENABLED: 'true' }, request: req });
  assert.equal(res.status, 413);
  assert.equal(writes.length, 0);
});

test('honeypot silently ignores bots without writing data', async () => {
  const { LEADS_DB, writes } = mockDB();
  const res = await onRequestPost({
    env: { LEADS_DB, WAITLIST_ENABLED: 'true' },
    request: request(JSON.stringify({ email: 'bot@example.com', consent: true, website: 'spam' })),
  });
  assert.equal(res.status, 200);
  assert.equal(writes.length, 0);
});

test('consented valid interest is persisted with normalized email', async () => {
  const { LEADS_DB, writes } = mockDB();
  const res = await onRequestPost({
    env: { LEADS_DB, WAITLIST_ENABLED: 'true' },
    request: request(JSON.stringify({ email: '  DOCENTE@EXAMPLE.COM ', consent: true, source: 'landing' })),
  });
  assert.equal(res.status, 200);
  assert.equal(writes.length, 1);
  assert.equal(writes[0].values[0], 'docente@example.com');
  assert.equal(writes[0].values[1], 'landing');
});

test('payment CTA remains disabled for missing or invalid secrets and URLs', async () => {
  const valid = { MP_CHECKOUT_ENABLED: 'true', MP_ACCESS_TOKEN: 'placeholder', MP_WEBHOOK_SECRET: 'placeholder',
    MP_PRICE_PEN: '34', MP_ENVIRONMENT: 'test', SITE_URL: 'https://vibecoding.sistemazenit.com/' };
  const getReady = (env) => checkoutStatus({ env }).json();
  assert.equal((await getReady({})).ready, false);
  assert.equal((await getReady({ ...valid, SITE_URL: 'http://vibecoding.sistemazenit.com/' })).ready, false);
  assert.equal((await getReady({ ...valid, SITE_URL: 'not-a-url' })).ready, false);
  assert.equal((await getReady(valid)).ready, true);
});
