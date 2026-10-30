import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('la landing se orienta a matemáticas y un precio de entrada',()=>{
  assert.match(app,/US\$9/);
  assert.match(app,/id="inscripcion"/);
  assert.match(app,/Docentes de secundaria, academia y universidad/);
  assert.match(app,/experiencias que despiertan la curiosidad/);
  assert.match(app,/id="caso-real"/);
  assert.doesNotMatch(app,/82% plazas ocupadas|Solo 50 plazas|AbTestingBar/);
});
test('caso docente real: Transformaciones Geométricas y sus beneficios para el aula',()=>{
  assert.match(app,/Enseñar transformaciones geométricas/);
  assert.match(app,/redibujar todo a mano/);
  assert.match(app,/ruta de aprendizaje/);
  assert.match(app,/materiales imprimibles/);
  assert.match(app,/transformacionesgeometricas\.sistemazenit\.com/);
  assert.match(app,/id="caso-real"/);
  assert.doesNotMatch(app,/garantiza mayor retención|retención garantizada|100% de atención/);
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
test('los 6 proyectos remiten a capturas documentadas locales',()=>{
  for(const name of ['todo-lima','herramientas-pymes','mundos-simulados','funciones-lab','transformaciones-geometricas','rale-test-vocacional']){
    assert.match(app,new RegExp(name+'\\.webp'));
    assert.ok(existsSync(new URL('../public/projects/captures/'+name+'.webp',import.meta.url)));
  }
});
test('fotografía auténtica del instructor pendiente',()=>{
  assert.match(app,/function PortraitPlaceholder/);
  assert.match(app,/Fotografía real del instructor/);
});
test('SEO corresponde a la campaña educativa y su dominio',()=>{
  assert.match(html,/bycoding\.systems\.mx\.com/);
  assert.match(html,/apps interactivas para tus clases de matemáticas/);
});
test('el registro de interesados no está activo sin D1 y consentimiento',()=>{
  const api=readFileSync(new URL('../functions/api/waitlist.ts',import.meta.url),'utf8');
  assert.match(api,/WAITLIST_ENABLED === "true"/);
  assert.match(api,/consent !== true/);
  assert.match(api,/LEADS_DB/);
});
