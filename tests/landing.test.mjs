import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

test('la landing se orienta a matemáticas y un precio de entrada',()=>{
  assert.match(app,/US\$9/);
  assert.match(app,/id="inscripcion"/);
  assert.match(app,/docentes de matemáticas/);
  assert.match(app,/simulacro autocorregible/);
  assert.doesNotMatch(app,/82% plazas ocupadas|Solo 50 plazas|AbTestingBar/);
});
test('el simulacro didáctico incluye error lógico y solución correcta',()=>{
  assert.match(app,/function QuizDemo/);
  assert.match(app,/const correctAnswer=3/);
  assert.match(app,/const bugAnswer=4/);
  assert.match(app,/setCorrected/);
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
  assert.match(html,/simulacro de matemáticas/);
});
test('el registro de interesados no está activo sin D1 y consentimiento',()=>{
  const api=readFileSync(new URL('../functions/api/waitlist.ts',import.meta.url),'utf8');
  assert.match(api,/WAITLIST_ENABLED === "true"/);
  assert.match(api,/consent !== true/);
  assert.match(api,/LEADS_DB/);
});
