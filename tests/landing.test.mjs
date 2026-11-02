import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('la landing se orienta a matemáticas y un precio de entrada',()=>{
  assert.match(app,/US\$9/);
  assert.match(app,/id="inscripcion"/);
  assert.match(app,/profesores de matemáticas/i);
  assert.match(app,/Menos tiempo escribiendo y dibujando en la pizarra/);
  assert.match(app,/Más tiempo guiando el aprendizaje/);
  assert.match(app,/Pizarras Vivas en 2D y 3D/);
  assert.match(app,/USB 100% sin internet/);
  assert.match(app,/id="caso-real"/);
  assert.doesNotMatch(app,/82% plazas ocupadas|Solo 50 plazas|AbTestingBar/);
});
test('caso docente real: Transformaciones Geométricas y sus beneficios para el aula',()=>{
  assert.match(app,/Enseñar transformaciones geométricas/);
  assert.match(app,/sin empezar cada gráfico desde cero/);
  assert.match(app,/ruta de aprendizaje/);
  assert.match(app,/materiales imprimibles/);
  assert.match(app,/transformacionesgeometricas\.sistemazenit\.com/);
  assert.match(app,/id="caso-real"/);
  assert.doesNotMatch(app,/garantiza mayor retención|retención garantizada|100% de atención/);
});
test('Sólidos Geométricos acompaña una secuencia didáctica verificada',()=>{
  assert.match(app,/id="caso-solidos"/);
  assert.match(app,/Sólidos Geométricos/);
  assert.match(app,/secuencia didáctica/);
  assert.match(app,/caras, vértices y aristas/);
  assert.match(app,/red plana/);
  assert.match(app,/resolver|Resuelve retos/);
  assert.match(app,/solidosgeometricos\.sistemazenit\.com/);
  assert.ok(existsSync(new URL('../public/projects/captures/solidos-geometricos.webp',import.meta.url)));
});
test('el escaparate presenta tres niveles matemáticos y visualización real',()=>{
  const studio=readFileSync(new URL('../src/components/MathStudio.tsx',import.meta.url),'utf8');
  assert.match(app,/MathStudio/);
  assert.doesNotMatch(app,/QuizDemo|3\(2x \+ 1\)/);
  for(const level of ['secundaria','preuni','universidad']) assert.match(studio,new RegExp(level));
  assert.match(studio,/function MathGraph/);
  assert.match(studio,/quadraticFacts/);
  assert.match(studio,/calculusFacts/);
  assert.match(studio,/trigFacts/);
});
test('los 7 proyectos remiten a capturas documentadas locales',()=>{
  for(const name of ['todo-lima','herramientas-pymes','mundos-simulados','funciones-lab','transformaciones-geometricas','rale-test-vocacional','solidos-geometricos']){
    assert.match(app,new RegExp(name+'\\.webp'));
    assert.ok(existsSync(new URL('../public/projects/captures/'+name+'.webp',import.meta.url)));
  }
});
test('fotografía auténtica del instructor incorporada',()=>{
  assert.match(app,/InstructorPortrait/);
  assert.match(app,/xavier-cabello\.webp/);
  assert.ok(existsSync(new URL('../public/instructor/xavier-cabello.webp',import.meta.url)));
});
test('imágenes y mockups de alta conversión integrados',()=>{
  assert.match(app,/bundle-kit-taller-docente\.webp/);
  assert.ok(existsSync(new URL('../public/workshop/bundle-kit-taller-docente.webp',import.meta.url)));
  for(const stage of ['dolor-pizarra-vs-clase-viva','etapa-01-modelo-matematico','etapa-02-interaccion-ia','etapa-03-publicacion-web']){
    assert.match(app,new RegExp(stage+'\\.webp'));
    assert.ok(existsSync(new URL('../public/metodo/'+stage+'.webp',import.meta.url)));
  }
});
test('SEO corresponde a la campaña educativa y su dominio',()=>{
  assert.match(html,/vibecoding\.sistemazenit\.com/);
  assert.match(html,/og-matematicas-ia\.png/);
  assert.match(html,/Menos tiempo escribiendo y dibujando en la pizarra/);
  assert.ok(existsSync(new URL('../public/og-matematicas-ia.webp',import.meta.url)) || existsSync(new URL('../public/og-matematicas-ia.png',import.meta.url)));
});
test('el registro de interesados no está activo sin D1 y consentimiento',()=>{
  const api=readFileSync(new URL('../functions/api/waitlist.ts',import.meta.url),'utf8');
  assert.match(api,/WAITLIST_ENABLED === "true"/);
  assert.match(api,/consent !== true/);
  assert.match(api,/LEADS_DB/);
});
