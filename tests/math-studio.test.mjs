import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source=readFileSync(new URL('../src/components/MathStudio.tsx',import.meta.url),'utf8');
const compiled=ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,jsx:ts.JsxEmit.ReactJSX,target:ts.ScriptTarget.ES2022}}).outputText;
const context={exports:{},require:()=>({})};
vm.runInNewContext(compiled,context);
const {quadraticFacts,trigFacts,calculusFacts}=context.exports;

test('parábola: discriminante, vértice y raíces comprobables',()=>{
  const r=quadraticFacts(1,-2,-3);
  assert.equal(r.discriminant,16);
  assert.equal(r.vertexX,1);
  assert.equal(r.vertexY,-4);
  assert.deepEqual(Array.from(r.roots),[-1,3]);
});
test('parábola sin intersecciones reales no dibuja falsas raíces',()=>{
  const r=quadraticFacts(1,0,4);
  assert.equal(r.discriminant,-16);
  assert.equal(r.roots.length,0);
});
test('trigonometría: período y desfase en radianes',()=>{
  const r=trigFacts(2,2,90);
  assert.ok(Math.abs(r.period-Math.PI)<1e-10);
  assert.ok(Math.abs(r.shift+Math.PI/4)<1e-10);
  assert.equal(r.amplitude,2);
});
test('cálculo: pendiente de tangente frente a secante',()=>{
  const r=calculusFacts(1,0.1);
  assert.equal(r.y,-2);
  assert.equal(r.exact,0);
  assert.ok(Math.abs(r.approximate-0.31)<1e-10);
});
test('el laboratorio usa SVG real con rangos y roles accesibles',()=>{
  assert.match(source,/role="tablist"/);
  assert.match(source,/aria-selected/);
  assert.match(source,/type="range"/);
  assert.match(source,/viewBox="0 0 680 345"/);
  assert.match(source,/clipPath/);
  assert.doesNotMatch(source,/Math\.random\(/);
});
