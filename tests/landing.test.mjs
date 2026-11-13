import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const app = read('src/App.tsx');
const html = read('index.html');
const demo = read('src/components/HeroMathPreview.tsx');

test('estructura editorial completa abierta a profesionales en la industria de la educación', () => {
  for (const id of [
    'demostracion',
    'problema',
    'incluye',
    'metodo',
    'proyectos',
    'fundador',
    'comprar',
    'para-quien',
    'preguntas',
  ]) {
    assert.ok(app.includes('id="' + id + '"'), 'Falta el bloque ' + id);
  }
  assert.match(app, /TALLER PRÁCTICO · IA PARA PROFESIONALES DE LA EDUCACIÓN/);
  assert.match(app, /profesionales innovadores en la industria de la educación/i);
  assert.match(app, /aplicaciones web interactivas con IA/i);
  assert.match(app, /¿El taller es solo para profesores de matemáticas\?/);
  assert.match(app, /US\$9/);
  assert.match(app, /SkoolCheckoutButton/);
  assert.match(app, /WaitlistForm/);
  assert.doesNotMatch(app, /Microagencia|AbTestingBar|82% plazas ocupadas/i);
});

test('demo hero real tiene tres modos y dos sliders por modo', () => {
  assert.match(app, /HeroMathPreview/);
  for (const mode of ['conicas', 'trigonometria', 'vectores']) {
    assert.match(demo, new RegExp(mode));
  }
  assert.match(demo, /type="range"/);
  assert.match(demo, /parabolaFacts/);
  assert.match(demo, /trigPeriod/);
  assert.match(demo, /vectorComponents/);
});

test('el graficador avanzado Math Studio se conserva intacto con sus tres niveles académicos', () => {
  const studio = read('src/components/MathStudio.tsx');
  assert.match(app, /lazy\(\(\) => import\('\.\/components\/MathStudio'\)\)/);
  assert.match(app, /Explorar Math Studio/);
  for (const level of ['secundaria', 'preuni', 'universidad']) {
    assert.match(studio, new RegExp(level));
  }
  assert.match(studio, /function MathGraph/);
  assert.match(studio, /quadraticFacts/);
  assert.match(studio, /calculusFacts/);
  assert.match(studio, /trigFacts/);
});

test('autoridad del fundador respaldada con fotografía y trayectoria real desde 2023', () => {
  assert.match(app, /InstructorPortrait/);
  assert.match(app, /xavier-cabello\.webp/);
  assert.ok(existsSync(new URL('../public/instructor/xavier-cabello.webp', import.meta.url)));
  assert.match(app, /2023/);
});

test('SEO corresponde a la oferta oficial de US$9 y al dominio vibecoding', () => {
  assert.match(html, /Aplicaciones web interactivas con IA para educación \| US\$9/);
  assert.match(html, /https:\/\/vibecoding\.sistemazenit\.com\//);
  assert.match(html, /Precio oficial: US\$9/);
  assert.match(html, /og-matematicas-ia\.png/);
  assert.ok(existsSync(new URL('../public/og-matematicas-ia.png', import.meta.url)));
});

test('registro legado permanece condicionado a consentimiento y D1', () => {
  const api = read('functions/api/waitlist.ts');
  assert.match(api, /WAITLIST_ENABLED === "true"/);
  assert.match(api, /consent !== true/);
  assert.match(api, /LEADS_DB/);
});
