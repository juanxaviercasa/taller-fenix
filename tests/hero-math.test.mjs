import test from 'node:test';
import assert from 'node:assert/strict';
import { parabolaFacts, trigPeriod, vectorComponents } from '../src/math/previewFacts.ts';

const close = (a,b,epsilon=1e-10) => assert.ok(Math.abs(a-b) <= epsilon, a + ' != ' + b);

test('Parábola y=a(x-h)^2 + k: foco y directriz se separan 1/(4a)', () => {
  const { focusY, directrixY } = parabolaFacts(1, -2);
  close(focusY, -1.75);
  close(directrixY, -2.25);
  const other = parabolaFacts(0.5, 3);
  close(other.focusY, 3.5);
  close(other.directrixY, 2.5);
  assert.throws(() => parabolaFacts(0, 1), RangeError);
});

test('Para y=A sin(kx), periodo 2pi/|k|', () => {
  close(trigPeriod(1), 2 * Math.PI);
  close(trigPeriod(2), Math.PI);
  close(trigPeriod(-0.5), 4 * Math.PI);
  assert.throws(() => trigPeriod(0), RangeError);
});

test('Descomposición trigonométrica de vectores para 0°, 60° y 90°', () => {
  const x = vectorComponents(4, 0); close(x.x,4);close(x.y,0);
  const y = vectorComponents(4, 90);close(y.x,0);close(y.y,4);
  const z = vectorComponents(6, 60);close(z.x,3);close(z.y,3*Math.sqrt(3));
});
