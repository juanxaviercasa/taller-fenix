import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('la landing se centra en una oferta y un precio', () => {
  assert.match(app, /US\$9/);
  assert.match(app, /id="inscripcion"/);
  assert.doesNotMatch(app, /AbTestingBar|82% plazas ocupadas|Solo 50 plazas/);
  assert.doesNotMatch(app, /conversi[oó]n.*3\.4x/);
});
test('la galería apunta a capturas reales locales', () => {
  for (const name of ['todo-lima','herramientas-pymes','mundos-simulados','funciones-lab','transformaciones-geometricas','rale-test-vocacional']) {
    assert.match(app, new RegExp(name + '\\.webp'));
    assert.ok(existsSync(new URL('../public/projects/captures/' + name + '.webp', import.meta.url)));
  }
});
test('la persona se representa con un placeholder explícito, no retrato inventado', () => {
  assert.match(app, /function PortraitPlaceholder/);
  assert.match(app, /Fotografía real del instructor/);
});
test('SEO coherente con el dominio indicado', () => {
  assert.match(html, /https:\/\/bycoding\.systems\.mx\.com\//);
  assert.match(html, /description/);
});
