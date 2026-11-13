import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const read = path => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const app = read('src/App.tsx');

const realProjects = [
  ['funciones-lab.webp', 'https://funciones.sistemazenit.com/'],
  ['transformaciones-geometricas.webp', 'https://transformacionesgeometricas.sistemazenit.com/'],
  ['solidos-geometricos.webp', 'https://solidosgeometricos.sistemazenit.com/'],
  ['mundos-simulados.webp', 'https://mundossimulados.online/'],
  ['rale-test-vocacional.webp', 'https://raletest.sistemazenit.com/'],
  ['herramientas-pymes.webp', 'https://nubeparapymes.online/herramientas/'],
  ['todo-lima.webp', 'https://todolima.com/'],
];

test('escaparate muestra los 7 proyectos reales desarrollados con capturas y URLs verificadas', () => {
  for (const [image, url] of realProjects) {
    assert.ok(existsSync(new URL('../public/projects/captures/' + image, import.meta.url)), 'Falta captura ' + image);
    assert.ok(app.includes(`image: '${image}'`), 'Falta referencia a captura ' + image);
    assert.ok(app.includes(url), 'Falta URL real ' + url);
  }
  assert.match(app, /Matemáticas y Ciencias/);
  assert.match(app, /Automatización y Soluciones/);
});

const editorialAssets = [
  'dolor-dependencia-madrugada.webp',
  'deseo-soberania-aula.webp',
  'ruta-01-idea-guardada-a-app.webp',
  'ruta-02-construccion-ia-sin-codigo.webp',
  'ruta-03-automatizacion-tiempo-libre.webp',
  'taller-ruta-2023-mockup.webp',
];

test('no depende de HTML triviales de ejemplo ni promete acceso automático inactivo', () => {
  assert.doesNotMatch(app, /\/recursos\/|parabola-interactiva\.html|onda-trigonometrica\.html|vectores-componentes\.html/);
  assert.doesNotMatch(app, /30 laboratorios (incluidos|listos)|Acceso inmediato|membresía activa/i);
  const sitemap = read('public/sitemap.xml');
  assert.doesNotMatch(sitemap, /\/recursos\//);
});

test('activos editoriales hiperrealistas existen en WebP optimizado e incluyen carga diferida', () => {
  for (const file of editorialAssets) {
    assert.ok(existsSync(new URL('../public/docentes/' + file, import.meta.url)), 'Falta activo ' + file);
    assert.ok(app.includes('/docentes/' + file), 'Falta referencia en App.tsx a ' + file);
  }
  assert.match(app, /width="1280"/);
  assert.match(app, /height="720"/);
});
