import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = readFileSync(new URL('../src/components/MathStudio.tsx', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2022,
  },
}).outputText;

const context = { exports: {}, require: () => ({}) };
vm.runInNewContext(compiled, context);

const {
  quadraticFacts,
  trigFacts,
  inverseTrigFacts,
  calculusFacts,
  riemannFacts,
  FUNCTION_FAMILIES,
  DIRECT_TRIG_FNS,
  INVERSE_TRIG_FNS,
  CALCULUS_MODES,
  CALCULUS_FUNCTIONS,
  niceTicks,
  fitYRange,
  placeGraphCallout,
} = context.exports;

test('placeGraphCallout evita superponerse con peldaños horizontales, curvas y otras etiquetas', () => {
  const bounds = { left: 52, right: 650, top: 22, bottom: 307 };
  // Peldaño horizontal desde (380, 200) hacia la derecha hasta (460, 200)
  const stepObstacles = Array.from({ length: 9 }, (_, k) => [380 + k * 10, 200]);
  const circles = [[380, 200], [460, 200]];
  const placed = [];
  const box1 = placeGraphCallout(
    380,
    200,
    'P₀(1; −2)',
    bounds,
    stepObstacles,
    circles,
    placed,
    { xZero: 351, yZero: 164 },
    'above'
  );
  // La caja no debe tapar el punto (380, 200) ni la línea del peldaño y = 200
  assert.ok(box1.y + box1.h < 196 || box1.y > 204);
  assert.equal(placed.length, 1);

  // Una segunda etiqueta en el mismo punto se coloca sin solaparse con la primera
  const box2 = placeGraphCallout(
    380,
    200,
    'Q(1,5; −2)',
    bounds,
    stepObstacles,
    circles,
    placed,
    { xZero: 351, yZero: 164 }
  );
  const overlap = !(
    box1.x + box1.w <= box2.x ||
    box2.x + box2.w <= box1.x ||
    box1.y + box1.h <= box2.y ||
    box2.y + box2.h <= box1.y
  );
  assert.equal(overlap, false);
});

test('ejes adaptativos: niceTicks genera pasos 1-2-5 legibles para vistas ampliadas', () => {
  const global = niceTicks(-2.6, 2.6, 6);
  assert.equal(global.step, 1);
  assert.deepEqual(Array.from(global.ticks), [-2, -1, 0, 1, 2]);

  const lupa = niceTicks(0.575, 1.525, 6);
  assert.equal(lupa.step, 0.2);
  assert.deepEqual(Array.from(lupa.ticks), [0.6, 0.8, 1, 1.2, 1.4]);
});

test('triángulo diferencial: ε = Δy − dy es de orden h² (ε/h → 0)', () => {
  const ratios = [0.5, 0.1, 0.01].map((h) => {
    const r = calculusFacts(0.8, h, 'cubica');
    assert.ok(Math.abs(r.dy - r.exact * h) < 1e-12);
    return Math.abs((r.deltaY - r.dy) / h);
  });
  assert.ok(ratios[0] > ratios[1] && ratios[1] > ratios[2]);
  assert.ok(ratios[2] < 0.03);
});

test('fitYRange ajusta la ventana vertical a la curva e incluye siempre y = 0', () => {
  const agnesi = CALCULUS_FUNCTIONS.find((f) => f.id === 'agnesi');
  const r = fitYRange([agnesi.f], -2.6, 2.6);
  assert.ok(r.min <= -0.6 && r.min > -1.5);
  assert.ok(r.max >= 4 && r.max < 5);

  const cubic = CALCULUS_FUNCTIONS.find((f) => f.id === 'cubica');
  const rc = fitYRange([cubic.f], -2.6, 2.6);
  assert.equal(rc.min, -7.5);
  assert.equal(rc.max, 7.5);
});

test('parábola: discriminante, vértice y raíces comprobables (a > 0 y a < 0)', () => {
  const r = quadraticFacts(1, -2, -3);
  assert.equal(r.discriminant, 16);
  assert.equal(r.vertexX, 1);
  assert.equal(r.vertexY, -4);
  assert.deepEqual(Array.from(r.roots), [-1, 3]);

  // Concavidad negativa (a < 0)
  const rNeg = quadraticFacts(-1, 2, 3);
  assert.equal(rNeg.discriminant, 16);
  assert.equal(rNeg.vertexX, 1);
  assert.equal(rNeg.vertexY, 4);
  assert.deepEqual(Array.from(rNeg.roots), [-1, 3]);
});

test('parábola sin intersecciones reales no dibuja falsas raíces', () => {
  const r = quadraticFacts(1, 0, 4);
  assert.equal(r.discriminant, -16);
  assert.equal(r.roots.length, 0);
});

test('catálogo de secundaria incluye las 9 familias de funciones reales', () => {
  assert.equal(FUNCTION_FAMILIES.length, 9);
  const ids = FUNCTION_FAMILIES.map((f) => f.id);
  for (const expected of [
    'cuadratica',
    'lineal',
    'valor_absoluto',
    'raiz',
    'racional',
    'cubica',
    'exponencial',
    'logaritmica',
    'escalon',
  ]) {
    assert.ok(ids.includes(expected), `Falta familia ${expected}`);
  }
});

test('trigonometría directa: las 6 razones (sen, cos, tan, cot, sec, csc), período y asíntotas', () => {
  assert.equal(DIRECT_TRIG_FNS.length, 6);
  const ids = DIRECT_TRIG_FNS.map((f) => f.id);
  assert.deepEqual(Array.from(ids), ['sen', 'cos', 'tan', 'cot', 'sec', 'csc']);

  // Seno / Coseno: período 2π/k, sin asíntotas
  const rSen = trigFacts(2, 2, 90, 0, 'sen');
  assert.ok(Math.abs(rSen.period - Math.PI) < 1e-10);
  assert.ok(Math.abs(rSen.shift + Math.PI / 4) < 1e-10);
  assert.equal(rSen.amplitude, 2);
  assert.equal(rSen.asymptotes.length, 0);

  // Tangente / Cotangente: período π/k y asíntotas verticales en [-2π, 2π]
  const rTan = trigFacts(1, 1, 0, 0, 'tan');
  assert.ok(Math.abs(rTan.period - Math.PI) < 1e-10);
  assert.ok(rTan.asymptotes.length >= 4);
  assert.ok(rTan.asymptotes.some((a) => Math.abs(a - Math.PI / 2) < 1e-9));

  // Secante / Cosecante: período 2π/k con asíntotas verticales
  const rSec = trigFacts(1.5, 1, 0, 0, 'sec');
  assert.ok(Math.abs(rSec.period - 2 * Math.PI) < 1e-10);
  assert.ok(rSec.asymptotes.length >= 4);
});

test('trigonometría inversa: las 6 funciones arco (arcsen, arccos, arctan, arccot, arcsec, arccsc)', () => {
  assert.equal(INVERSE_TRIG_FNS.length, 6);
  const ids = INVERSE_TRIG_FNS.map((f) => f.id);
  assert.deepEqual(Array.from(ids), ['arcsen', 'arccos', 'arctan', 'arccot', 'arcsec', 'arccsc']);

  // arcsen y arccos: acotadas con 2 puntos terminales y sin asíntotas horizontales
  const asen = inverseTrigFacts('arcsen', 1, 1, 0, 0);
  assert.equal(asen.endpoints.length, 2);
  assert.equal(asen.hAsymptotes.length, 0);

  // arctan y arccot: 2 asíntotas horizontales en todo ℝ
  const atan = inverseTrigFacts('arctan', 1, 1, 0, 0);
  assert.equal(atan.hAsymptotes.length, 2);
  assert.ok(Math.abs(atan.hAsymptotes[0] + Math.PI / 2) < 1e-9);
  assert.ok(Math.abs(atan.hAsymptotes[1] - Math.PI / 2) < 1e-9);

  // arcsec y arccsc: dominio exterior y 1 asíntota horizontal central
  const asec = inverseTrigFacts('arcsec', 1, 1, 0, 0);
  assert.equal(asec.hAsymptotes.length, 1);
  assert.ok(Math.abs(asec.hAsymptotes[0] - Math.PI / 2) < 1e-9);
  assert.equal(asec.endpoints.length, 2);
});

test('cálculo universitario: derivada, sumas de Riemann y criterio de 1.ª y 2.ª derivada', () => {
  assert.equal(CALCULUS_MODES.length, 3);
  assert.equal(CALCULUS_FUNCTIONS.length, 4);

  // Derivada y diferencial sobre x³ - 3x
  const r = calculusFacts(1, 0.1, 'cubica');
  assert.equal(r.y, -2);
  assert.equal(r.exact, 0);
  assert.equal(r.secondDeriv, 6);
  assert.ok(Math.abs(r.approximate - 0.31) < 1e-10);

  // Sumas de Riemann sobre 4/(x² + 1) en [0, 1] converge a π ≈ 3.14159265
  const riem = riemannFacts('agnesi', 0, 1, 40, 'midpoint');
  assert.ok(Math.abs(riem.exactIntegral - Math.PI) < 1e-10);
  assert.ok(riem.error < 0.002);
  assert.equal(riem.rects.length, 40);
});

test('el laboratorio usa SVG real con corte de discontinuidades, rangos y roles accesibles', () => {
  assert.match(source, /role="tablist"/);
  assert.match(source, /aria-selected/);
  assert.match(source, /type="range"/);
  assert.match(source, /viewBox="0 0 680 345"/);
  assert.match(source, /clipPath/);
  assert.match(source, /crossedAsymptote/);
  assert.doesNotMatch(source, /Math\.random\(/);
});
