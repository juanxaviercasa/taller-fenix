import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const code = ts.transpileModule(readFileSync(new URL('../src/hooks/useDelayedCta.ts', import.meta.url), 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
function setup({ saved = null, blocked = false, server = false } = {}) {
  const states = [], effects = [], listeners = new Map(), timers = new Map();
  let stored = saved;
  const video = { currentTime: 0, paused: true, seeking: false, readyState: 4, playbackRate: 1, addEventListener: (name, fn) => listeners.set(name, fn), removeEventListener: name => listeners.delete(name) };
  const context = { exports: {}, Date, Number, Math, setTimeout: fn => { const id = Symbol(); timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id), require: () => ({ useState: initial => { const index = states.length; states.push(initial); return [initial, value => { states[index] = value; }]; }, useEffect: fn => effects.push(fn) }) };
  if (!server) context.window = { localStorage: { getItem: () => { if (blocked) throw Error('blocked'); return stored; }, setItem: (_, value) => { if (blocked) throw Error('blocked'); stored = value; } }, addEventListener() {}, removeEventListener() {} };
  vm.runInNewContext(code, context);
  const result = context.exports.useDelayedCta(video, 180, 'test');
  return { states, effects, timers, listeners, video, result, stored: () => stored };
}
test('SSR initial render does not access browser globals and keeps CTA hidden', () => {
  const h = setup({ server: true });
  assert.equal(h.result.isMounted, false);
  assert.equal(h.result.showCta, false);
});
test('restores valid persisted unlock after mount', () => {
  const h = setup({ saved: String(Date.now() - 1000) });
  const cleanup = h.effects[0]();
  assert.deepEqual(h.states, [true, true]);
  cleanup();
});
test('playback unlocks at pitch, pauses cancel timers, cleanup removes listeners', () => {
  const h = setup();
  const cleanup = h.effects[0]();
  assert.deepEqual(h.states, [true, false]);
  h.video.paused = false;
  h.video.currentTime = 90;
  h.listeners.get('playing')();
  assert.equal(h.timers.size, 1);
  h.video.paused = true;
  h.listeners.get('pause')();
  assert.equal(h.timers.size, 0);
  assert.equal(h.states[1], false);
  h.video.currentTime = 180;
  h.listeners.get('timeupdate')();
  assert.equal(h.states[1], true);
  assert.ok(Number(h.stored()) > 0);
  cleanup();
  assert.equal(h.listeners.size, 0);
  assert.equal(h.timers.size, 0);
});
test('blocked localStorage does not prevent playback unlock', () => {
  const h = setup({ blocked: true });
  const cleanup = h.effects[0]();
  h.video.currentTime = 180;
  assert.doesNotThrow(() => h.listeners.get('timeupdate')());
  assert.equal(h.states[1], true);
  cleanup();
});
test('invalid persisted values do not reveal CTA', () => {
  for (const saved of ['true', '0', '-1', String(Date.now() + 100000)]) {
    const h = setup({ saved });
    const cleanup = h.effects[0]();
    assert.equal(h.states[1], false);
    cleanup();
  }
});
