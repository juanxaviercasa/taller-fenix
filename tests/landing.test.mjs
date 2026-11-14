import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const app = read('src/App.tsx');
const html = read('index.html');
const vsl = read('src/components/HeroVslPlayer.tsx');

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
  assert.match(app, /TALLER PRÁCTICO · IA PARA QUIENES TRABAJAN EN EDUCACIÓN/);
  assert.match(app, /Crea tus propias apps educativas con IA/);
  assert.match(app, /sin saber programar/);
  assert.match(app, /profesor, tutor, coordinador o trabajas en educación/);
  assert.match(app, /¿Es solo para profesores de matemáticas\?/);
  assert.match(app, /US\$9/);
  assert.match(app, /SkoolCheckoutButton/);
  assert.match(app, /WaitlistForm/);
  assert.doesNotMatch(app, /Microagencia|AbTestingBar|82% plazas ocupadas/i);
});

test('el copy usa lenguaje sencillo y evita la jerga y las repeticiones de la versión anterior', () => {
  assert.doesNotMatch(app, /industria de la educación|soberanía|escalable|LaTeX|SVG|prototipo|precisión visual/i);
  const mentions2023 = (app.match(/2023/g) || []).length;
  assert.ok(mentions2023 <= 6, '2023 aparece ' + mentions2023 + ' veces');
  assert.ok((app.match(/pruebas? y error/gi) || []).length <= 2);
});

test('reproductor VSL en el hero presenta las 4 etapas clave del método Sistema Zénit', () => {
  assert.match(app, /HeroVslPlayer/);
  for (const stage of ['revelacion', 'metodo', 'caminos', 'oferta']) {
    assert.match(vsl, new RegExp(stage));
  }
  assert.match(vsl, /Entrevista Inversa/);
  assert.match(vsl, /VITE_VSL_VIDEO_URL/);
});

test('el graficador avanzado Math Studio se conserva intacto con sus tres niveles académicos', () => {
  const studio = read('src/components/MathStudio.tsx');
  assert.match(app, /lazy\(\(\) => import\('\.\/components\/MathStudio'\)\)/);
  assert.match(app, /Abrir Math Studio/);
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
  assert.match(html, /Crea tus propias apps educativas con IA, sin saber programar/);
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
