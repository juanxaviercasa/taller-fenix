/** Modelo de cónicas y vectores utilizado por la demo real de la landing. */
export function parabolaFacts(a: number, vertexY: number) {
  if (!Number.isFinite(a) || a === 0) throw new RangeError('El coeficiente a debe ser distinto de cero.');
  const focalDistance = 1 / (4 * a);
  return { focusY: vertexY + focalDistance, directrixY: vertexY - focalDistance };
}

export function trigPeriod(k: number) {
  if (!Number.isFinite(k) || k === 0) throw new RangeError('La frecuencia debe ser distinta de cero.');
  return 2 * Math.PI / Math.abs(k);
}

export function vectorComponents(magnitude: number, angleDegrees: number) {
  if (!Number.isFinite(magnitude) || !Number.isFinite(angleDegrees)) throw new RangeError('Parámetros inválidos.');
  const angle = angleDegrees * Math.PI / 180;
  return { x: magnitude * Math.cos(angle), y: magnitude * Math.sin(angle) };
}
