import { useId, useMemo, useState } from 'react';
import {
  ArrowUpRight,
  ChartNoAxesCombined,
  CircleDot,
  Compass,
  Layers,
  Sigma,
  SlidersHorizontal,
  Sparkles,
} from 'lucide-react';

export type Level = 'secundaria' | 'preuni' | 'universidad';
type Interval = { min: number; max: number };
type GraphDomain = { x: Interval; y: Interval };

export type FunctionFamilyId =
  | 'cuadratica'
  | 'lineal'
  | 'valor_absoluto'
  | 'raiz'
  | 'racional'
  | 'cubica'
  | 'exponencial'
  | 'logaritmica'
  | 'escalon';

export type TrigCategory = 'directas' | 'inversas';
export type DirectTrigId = 'sen' | 'cos' | 'tan' | 'cot' | 'sec' | 'csc';
export type InverseTrigId = 'arcsen' | 'arccos' | 'arctan' | 'arccot' | 'arcsec' | 'arccsc';

export type CalculusModeId = 'derivada' | 'integral' | 'curva';
export type CalculusFnId = 'cubica' | 'agnesi' | 'oscilante' | 'cuartica';
export type RiemannRule = 'midpoint' | 'left' | 'right';

type PointMarker = {
  x: number;
  y: number;
  label?: string;
  color?: string;
  hollow?: boolean;
};

type StepSegment = {
  x1: number;
  x2: number;
  y: number;
};

type RiemannRect = {
  x: number;
  width: number;
  y: number;
};

const LEVELS: { id: Level; stage: string; label: string; badge: string }[] = [
  {
    id: 'secundaria',
    stage: '4.º–5.º secundaria',
    label: 'Familias de Funciones',
    badge: '9 funciones reales',
  },
  {
    id: 'preuni',
    stage: 'Academia preuniversitaria',
    label: 'Trigonometría Directa e Inversa',
    badge: '12 funciones (6+6)',
  },
  {
    id: 'universidad',
    stage: 'Nivel universitario',
    label: 'Cálculo Diferencial e Integral',
    badge: 'Derivada · Riemann · f″',
  },
];

export const FUNCTION_FAMILIES: {
  id: FunctionFamilyId;
  short: string;
  title: string;
  formulaTemplate: string;
  note: string;
}[] = [
  {
    id: 'cuadratica',
    short: 'Cuadrática',
    title: 'Función Cuadrática (Parábola)',
    formulaTemplate: 'f(x) = ax² + bx + c',
    note: 'Vértice, eje de simetría, concavidad (a ≠ 0), discriminante Δ y raíces reales.',
  },
  {
    id: 'lineal',
    short: 'Lineal / Afín',
    title: 'Función Lineal y Afín',
    formulaTemplate: 'f(x) = mx + b',
    note: 'Pendiente m, ángulo de inclinación θ, corte con los ejes y razón de cambio constante.',
  },
  {
    id: 'valor_absoluto',
    short: 'Valor Absoluto',
    title: 'Función Valor Absoluto',
    formulaTemplate: 'f(x) = a|x − h| + k',
    note: 'Vértice angular V(h; k), simetría axial y definición por tramos.',
  },
  {
    id: 'raiz',
    short: 'Raíz Cuadrada',
    title: 'Función Raíz Cuadrada (Radical)',
    formulaTemplate: 'f(x) = a√(s(x − h)) + k',
    note: 'Punto frontera de inicio (h; k), restricción de dominio y monotonía.',
  },
  {
    id: 'racional',
    short: 'Racional 1/x',
    title: 'Función Racional Homográfica (Hipérbola)',
    formulaTemplate: 'f(x) = a/(x − h) + k',
    note: 'Asíntota vertical x = h, asíntota horizontal y = k y ramas hiperbólicas.',
  },
  {
    id: 'cubica',
    short: 'Cúbica',
    title: 'Función Polinomial Cúbica',
    formulaTemplate: 'f(x) = a(x − h)³ + b(x − h) + k',
    note: 'Punto de inflexión I(h; k), cambio de concavidad y extremos relativos.',
  },
  {
    id: 'exponencial',
    short: 'Exponencial',
    title: 'Función Exponencial',
    formulaTemplate: 'f(x) = a · b^(x − h) + k',
    note: 'Crecimiento (b > 1) vs. decaimiento (0 < b < 1) y asíntota horizontal y = k.',
  },
  {
    id: 'logaritmica',
    short: 'Logarítmica',
    title: 'Función Logarítmica Natural',
    formulaTemplate: 'f(x) = a · ln(x − h) + k',
    note: 'Dominio restringido (h; +∞), asíntota vertical x = h y cero exacto.',
  },
  {
    id: 'escalon',
    short: 'Máx. Entero ⌊x⌋',
    title: 'Función Máximo Entero (Escalón)',
    formulaTemplate: 'f(x) = a⌊b(x − h)⌋ + k',
    note: 'Peldaños discontinuos con extremo cerrado izquierdo y extremo abierto derecho.',
  },
];

export const DIRECT_TRIG_FNS: {
  id: DirectTrigId;
  symbol: string;
  name: string;
  note: string;
}[] = [
  { id: 'sen', symbol: 'sen', name: 'Seno', note: 'Onda periódica impar respecto al origen sin asíntotas.' },
  { id: 'cos', symbol: 'cos', name: 'Coseno', note: 'Onda periódica par desfasada π/2 respecto al seno.' },
  { id: 'tan', symbol: 'tan', name: 'Tangente', note: 'Período π/k con asíntotas verticales en kx + φ = π/2 + nπ.' },
  { id: 'cot', symbol: 'cot', name: 'Cotangente', note: 'Período π/k decreciente en cada rama, asíntotas en kx + φ = nπ.' },
  { id: 'sec', symbol: 'sec', name: 'Secante', note: 'Recíproca del coseno (1/cos), con curva guía cos punteada.' },
  { id: 'csc', symbol: 'csc', name: 'Cosecante', note: 'Recíproca del seno (1/sen), con curva guía sen punteada.' },
];

export const INVERSE_TRIG_FNS: {
  id: InverseTrigId;
  symbol: string;
  name: string;
  note: string;
}[] = [
  { id: 'arcsen', symbol: 'arcsen', name: 'Arcoseno (sen⁻¹)', note: 'Dominio acotado [h−1/B; h+1/B] y rango principal [−π/2; π/2] escalado.' },
  { id: 'arccos', symbol: 'arccos', name: 'Arcocoseno (cos⁻¹)', note: 'Dominio acotado [h−1/B; h+1/B], decreciente hacia [0; π] escalado.' },
  { id: 'arctan', symbol: 'arctan', name: 'Arcotangente (tan⁻¹)', note: 'Definida en todo ℝ con asíntotas horizontales en y = D ± Aπ/2.' },
  { id: 'arccot', symbol: 'arccot', name: 'Arcocotangente (cot⁻¹)', note: 'Definida en todo ℝ, decreciente entre las asíntotas y = D y y = D + Aπ.' },
  { id: 'arcsec', symbol: 'arcsec', name: 'Arcosecante (sec⁻¹)', note: 'Dominio exterior |B(x−h)| ≥ 1 con asíntota horizontal central y = D + Aπ/2.' },
  { id: 'arccsc', symbol: 'arccsc', name: 'Arcocosecante (csc⁻¹)', note: 'Dominio exterior |B(x−h)| ≥ 1 con asíntota horizontal central y = D.' },
];

export const CALCULUS_MODES: {
  id: CalculusModeId;
  label: string;
  title: string;
  note: string;
}[] = [
  {
    id: 'derivada',
    label: 'Tangente vs. Secante',
    title: 'Derivada: Recta Tangente, Secante y Diferencial',
    note: 'Visualiza cómo la recta secante entre P(x₀) y Q(x₀+h) converge a la recta tangente cuando h → 0.',
  },
  {
    id: 'integral',
    label: 'Sumas de Riemann',
    title: 'Integral Definida y Particiones de Riemann',
    note: 'Compara la suma de áreas de n rectángulos con el valor exacto por el Teorema Fundamental del Cálculo.',
  },
  {
    id: 'curva',
    label: 'Criterio f, f′ y f″',
    title: 'Análisis Completo: Función, 1.ª y 2.ª Derivada',
    note: 'Superpone f(x), su velocidad de cambio f′(x) y su concavidad f″(x) para hallar extremos e inflexión.',
  },
];

export const CALCULUS_FUNCTIONS: {
  id: CalculusFnId;
  label: string;
  formula: string;
  derivativeFormula: string;
  secondDerivativeFormula: string;
  f: (x: number) => number;
  df: (x: number) => number;
  d2f: (x: number) => number;
  F: (x: number) => number;
  criticalPoints: number[];
  inflectionPoints: number[];
}[] = [
  {
    id: 'cubica',
    label: 'x³ − 3x',
    formula: 'f(x) = x³ − 3x',
    derivativeFormula: 'f′(x) = 3x² − 3',
    secondDerivativeFormula: 'f″(x) = 6x',
    f: (x) => x * x * x - 3 * x,
    df: (x) => 3 * x * x - 3,
    d2f: (x) => 6 * x,
    F: (x) => (x * x * x * x) / 4 - (3 * x * x) / 2,
    criticalPoints: [-1, 1],
    inflectionPoints: [0],
  },
  {
    id: 'agnesi',
    label: '4 / (x² + 1)',
    formula: 'f(x) = 4 / (x² + 1)',
    derivativeFormula: 'f′(x) = −8x / (x² + 1)²',
    secondDerivativeFormula: 'f″(x) = 8(3x² − 1) / (x² + 1)³',
    f: (x) => 4 / (x * x + 1),
    df: (x) => (-8 * x) / ((x * x + 1) * (x * x + 1)),
    d2f: (x) => (8 * (3 * x * x - 1)) / Math.pow(x * x + 1, 3),
    F: (x) => 4 * Math.atan(x),
    criticalPoints: [0],
    inflectionPoints: [-1 / Math.sqrt(3), 1 / Math.sqrt(3)],
  },
  {
    id: 'oscilante',
    label: '2 sen(x) + 0.5x',
    formula: 'f(x) = 2 sen(x) + 0.5x',
    derivativeFormula: 'f′(x) = 2 cos(x) + 0.5',
    secondDerivativeFormula: 'f″(x) = −2 sen(x)',
    f: (x) => 2 * Math.sin(x) + 0.5 * x,
    df: (x) => 2 * Math.cos(x) + 0.5,
    d2f: (x) => -2 * Math.sin(x),
    F: (x) => -2 * Math.cos(x) + 0.25 * x * x,
    criticalPoints: [-Math.acos(-0.25), Math.acos(-0.25)],
    inflectionPoints: [-Math.PI, 0, Math.PI],
  },
  {
    id: 'cuartica',
    label: '0.5x⁴ − 2x²',
    formula: 'f(x) = 0.5x⁴ − 2x²',
    derivativeFormula: 'f′(x) = 2x³ − 4x',
    secondDerivativeFormula: 'f″(x) = 6x² − 4',
    f: (x) => 0.5 * Math.pow(x, 4) - 2 * x * x,
    df: (x) => 2 * x * x * x - 4 * x,
    d2f: (x) => 6 * x * x - 4,
    F: (x) => 0.1 * Math.pow(x, 5) - (2 / 3) * x * x * x,
    criticalPoints: [-Math.SQRT2, 0, Math.SQRT2],
    inflectionPoints: [-Math.sqrt(2 / 3), Math.sqrt(2 / 3)],
  },
];

export function quadraticFacts(a: number, b: number, c: number) {
  if (Math.abs(a) < 1e-9) {
    const root = Math.abs(b) > 1e-9 ? [-c / b] : [];
    return {
      discriminant: b * b,
      vertexX: 0,
      vertexY: c,
      roots: root,
    };
  }
  const discriminant = b * b - 4 * a * c;
  const vertexX = -b / (2 * a);
  const vertexY = a * vertexX * vertexX + b * vertexX + c;
  if (discriminant < 0) {
    return { discriminant, vertexX, vertexY, roots: [] as number[] };
  }
  if (Math.abs(discriminant) < 1e-9) {
    return { discriminant: 0, vertexX, vertexY, roots: [vertexX] };
  }
  const r1 = (-b - Math.sqrt(discriminant)) / (2 * a);
  const r2 = (-b + Math.sqrt(discriminant)) / (2 * a);
  return {
    discriminant,
    vertexX,
    vertexY,
    roots: [Math.min(r1, r2), Math.max(r1, r2)],
  };
}

export function trigFacts(
  amplitude: number,
  frequency: number,
  phaseDegrees: number,
  verticalShift = 0,
  fnId: DirectTrigId = 'sen'
) {
  const k = Math.abs(frequency) < 1e-9 ? 1 : Math.abs(frequency);
  const isHalfPeriod = fnId === 'tan' || fnId === 'cot';
  const period = (isHalfPeriod ? Math.PI : 2 * Math.PI) / k;
  const phaseRad = (phaseDegrees * Math.PI) / 180;
  const shift = -phaseRad / frequency;

  // Compute vertical asymptotes inside [-2π, 2π]
  const asymptotes: number[] = [];
  if (fnId === 'tan' || fnId === 'sec' || fnId === 'cot' || fnId === 'csc') {
    const baseOffset = fnId === 'tan' || fnId === 'sec' ? Math.PI / 2 : 0;
    for (let n = -8; n <= 8; n++) {
      const xVal = (baseOffset + n * Math.PI - phaseRad) / frequency;
      if (xVal >= -2 * Math.PI - 0.01 && xVal <= 2 * Math.PI + 0.01) {
        asymptotes.push(xVal);
      }
    }
  }

  return {
    period,
    shift,
    amplitude,
    verticalShift,
    asymptotes,
  };
}

export function inverseTrigFacts(
  fnId: InverseTrigId,
  scaleA: number,
  scaleB: number,
  shiftH: number,
  shiftD: number
) {
  const bAbs = Math.max(0.1, Math.abs(scaleB));
  const halfWidth = 1 / bAbs;
  const leftBound = shiftH - halfWidth;
  const rightBound = shiftH + halfWidth;

  if (fnId === 'arcsen') {
    const yMin = shiftD - Math.abs(scaleA) * (Math.PI / 2);
    const yMax = shiftD + Math.abs(scaleA) * (Math.PI / 2);
    return {
      domainText: `[${pretty(leftBound)}; ${pretty(rightBound)}]`,
      rangeText: `[${pretty(yMin)}; ${pretty(yMax)}]`,
      hAsymptotes: [] as number[],
      endpoints: [
        { x: leftBound, y: shiftD - scaleA * (Math.PI / 2), label: 'E₁' },
        { x: rightBound, y: shiftD + scaleA * (Math.PI / 2), label: 'E₂' },
      ],
    };
  }
  if (fnId === 'arccos') {
    const y1 = shiftD;
    const y2 = shiftD + scaleA * Math.PI;
    return {
      domainText: `[${pretty(leftBound)}; ${pretty(rightBound)}]`,
      rangeText: `[${pretty(Math.min(y1, y2))}; ${pretty(Math.max(y1, y2))}]`,
      hAsymptotes: [] as number[],
      endpoints: [
        { x: leftBound, y: shiftD + scaleA * Math.PI, label: 'E₁' },
        { x: rightBound, y: shiftD, label: 'E₂' },
      ],
    };
  }
  if (fnId === 'arctan') {
    const a1 = shiftD - scaleA * (Math.PI / 2);
    const a2 = shiftD + scaleA * (Math.PI / 2);
    return {
      domainText: 'ℝ (−∞; +∞)',
      rangeText: `(${pretty(Math.min(a1, a2))}; ${pretty(Math.max(a1, a2))})`,
      hAsymptotes: [a1, a2],
      endpoints: [] as PointMarker[],
    };
  }
  if (fnId === 'arccot') {
    const a1 = shiftD;
    const a2 = shiftD + scaleA * Math.PI;
    return {
      domainText: 'ℝ (−∞; +∞)',
      rangeText: `(${pretty(Math.min(a1, a2))}; ${pretty(Math.max(a1, a2))})`,
      hAsymptotes: [a1, a2],
      endpoints: [] as PointMarker[],
    };
  }
  if (fnId === 'arcsec') {
    const midAsymptote = shiftD + scaleA * (Math.PI / 2);
    const y1 = shiftD;
    const y2 = shiftD + scaleA * Math.PI;
    return {
      domainText: `(−∞; ${pretty(leftBound)}] ∪ [${pretty(rightBound)}; +∞)`,
      rangeText: `[${pretty(Math.min(y1, y2))}; ${pretty(Math.max(y1, y2))}] \\ {${pretty(midAsymptote)}}`,
      hAsymptotes: [midAsymptote],
      endpoints: [
        { x: leftBound, y: shiftD + scaleA * Math.PI, label: 'F₁' },
        { x: rightBound, y: shiftD, label: 'F₂' },
      ],
    };
  }
  // arccsc
  const midAsymptote = shiftD;
  const y1 = shiftD - scaleA * (Math.PI / 2);
  const y2 = shiftD + scaleA * (Math.PI / 2);
  return {
    domainText: `(−∞; ${pretty(leftBound)}] ∪ [${pretty(rightBound)}; +∞)`,
    rangeText: `[${pretty(Math.min(y1, y2))}; ${pretty(Math.max(y1, y2))}] \\ {${pretty(midAsymptote)}}`,
    hAsymptotes: [midAsymptote],
    endpoints: [
      { x: leftBound, y: shiftD - scaleA * (Math.PI / 2), label: 'F₁' },
      { x: rightBound, y: shiftD + scaleA * (Math.PI / 2), label: 'F₂' },
    ],
  };
}

export function calculusFacts(x: number, h: number, fnId: CalculusFnId = 'cubica') {
  const entry = CALCULUS_FUNCTIONS.find((item) => item.id === fnId) ?? CALCULUS_FUNCTIONS[0];
  const y = entry.f(x);
  const yNext = entry.f(x + h);
  const exact = entry.df(x);
  const secondDeriv = entry.d2f(x);
  const approximate = (yNext - y) / h;
  const integral = entry.F(x);
  const dy = exact * h;
  const deltaY = yNext - y;
  return {
    y,
    yNext,
    exact,
    secondDeriv,
    approximate,
    integral,
    dy,
    deltaY,
  };
}

export function riemannFacts(
  fnId: CalculusFnId,
  a: number,
  b: number,
  n: number,
  rule: RiemannRule = 'midpoint'
) {
  const entry = CALCULUS_FUNCTIONS.find((item) => item.id === fnId) ?? CALCULUS_FUNCTIONS[0];
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  const partitions = Math.max(1, Math.round(n));
  const dx = (hi - lo) / partitions;
  const rects: RiemannRect[] = [];
  let riemannSum = 0;

  if (dx > 1e-9) {
    for (let i = 0; i < partitions; i++) {
      const xLeft = lo + i * dx;
      const sampleX =
        rule === 'left' ? xLeft : rule === 'right' ? xLeft + dx : xLeft + dx * 0.5;
      const height = entry.f(sampleX);
      riemannSum += height * dx;
      rects.push({ x: xLeft, width: dx, y: height });
    }
  }
  const exactIntegral = entry.F(hi) - entry.F(lo);
  return {
    riemannSum,
    exactIntegral,
    error: Math.abs(exactIntegral - riemannSum),
    dx,
    rects,
  };
}

function pretty(n: number, precision = 2) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n) < 0.000001) return '0';
  return Number(n.toFixed(precision)).toLocaleString('es-PE', {
    maximumFractionDigits: precision,
  });
}

function signedTerm(v: number, suffix = '', showFirstPlus = false) {
  if (Math.abs(v) < 1e-9) return '';
  const sign = v >= 0 ? (showFirstPlus ? ' + ' : '') : ' − ';
  return `${sign}${pretty(Math.abs(v))}${suffix}`;
}

function Range({
  symbol,
  caption,
  min,
  max,
  step,
  value,
  onChange,
}: {
  symbol: string;
  caption: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block rounded-2xl border border-[#E8E1F3] bg-white p-3 transition hover:border-[#D4C3EC]">
      <span className="mb-1.5 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-[#625374]">{caption}</span>
        <span className="rounded-md bg-[#F1E9FF] px-2 py-0.5 font-mono text-xs font-bold text-[#6733C7]">
          {symbol} = {pretty(value, 2)}
        </span>
      </span>
      <input
        aria-label={caption}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className="w-full cursor-pointer accent-[#7540DF]"
      />
    </label>
  );
}

function MathGraph({
  level,
  domain,
  plot,
  aux,
  auxLabel,
  secondaryAux,
  secondaryAuxLabel,
  tangent,
  secant,
  marker,
  secondaryMarker,
  extraMarkers,
  roots,
  vAsymptotes,
  hAsymptotes,
  stepSegments,
  riemannRects,
  diffTriangle,
  yPiTicks,
  ariaDescription,
}: {
  level: Level;
  domain: GraphDomain;
  plot?: (x: number) => number;
  aux?: (x: number) => number;
  auxLabel?: string;
  secondaryAux?: (x: number) => number;
  secondaryAuxLabel?: string;
  tangent?: (x: number) => number;
  secant?: (x: number) => number;
  marker?: PointMarker;
  secondaryMarker?: PointMarker;
  extraMarkers?: PointMarker[];
  roots?: number[];
  vAsymptotes?: number[];
  hAsymptotes?: number[];
  stepSegments?: StepSegment[];
  riemannRects?: RiemannRect[];
  diffTriangle?: { x0: number; y0: number; x1: number; y1: number };
  yPiTicks?: boolean;
  ariaDescription?: string;
}) {
  const clipId = 'graph-' + useId().replace(/:/g, '');
  const { x, y } = domain;
  const left = 52;
  const right = 650;
  const top = 22;
  const bottom = 307;

  const sx = (v: number) => left + ((v - x.min) / (x.max - x.min)) * (right - left);
  const sy = (v: number) => bottom - ((v - y.min) / (y.max - y.min)) * (bottom - top);

  // Discontinuity-aware path builder: splits into separate M...L... segments on asymptotes or jumps
  const build = (fn: (x: number) => number) => {
    const parts: string[] = [];
    const samples = 420;
    const ySpan = y.max - y.min;
    let prevValid = false;
    let prevVy = 0;
    let prevVx = x.min;

    for (let i = 0; i <= samples; i++) {
      const vx = x.min + ((x.max - x.min) * i) / samples;
      const vy = fn(vx);

      if (!Number.isFinite(vy) || Math.abs(vy) > ySpan * 6) {
        prevValid = false;
        continue;
      }

      // Check if an explicit vertical asymptote lies between prevVx and vx
      const crossedAsymptote =
        prevValid &&
        vAsymptotes?.some((va) => (prevVx <= va && vx >= va) || Math.abs(vx - va) < (x.max - x.min) / samples);

      // Detect steep discontinuity jump (e.g., tan, cot, 1/x, floor)
      const isJump = prevValid && Math.abs(vy - prevVy) > ySpan * 0.85;

      const cmd = !prevValid || crossedAsymptote || isJump ? 'M' : 'L';
      parts.push(`${cmd}${sx(vx).toFixed(2)},${sy(vy).toFixed(2)}`);
      prevValid = true;
      prevVy = vy;
      prevVx = vx;
    }
    return parts.join(' ');
  };

  const isTrigRadianX = level === 'preuni' && x.max > 5;
  const xTicks = isTrigRadianX
    ? [-2 * Math.PI, -Math.PI, 0, Math.PI, 2 * Math.PI]
    : [-4, -3, -2, -1, 0, 1, 2, 3, 4].filter((v) => v >= x.min && v <= x.max);

  const yTicks = yPiTicks
    ? [-Math.PI, -Math.PI / 2, 0, Math.PI / 2, Math.PI].filter((v) => v >= y.min - 0.1 && v <= y.max + 0.1)
    : level === 'preuni'
      ? [-3, -2, -1, 0, 1, 2, 3].filter((v) => v >= y.min && v <= y.max)
      : [-8, -6, -4, -3, -2, 0, 2, 3, 4, 6, 8].filter(
          (v) => v >= y.min && v <= y.max && (y.max - y.min > 12 ? v % 3 === 0 : v % 2 === 0)
        );

  const xLabel = (v: number) => {
    if (!isTrigRadianX) return String(v);
    if (v === 0) return '0';
    if (Math.abs(v - Math.PI) < 1e-4) return 'π';
    if (Math.abs(v + Math.PI) < 1e-4) return '−π';
    if (Math.abs(v - 2 * Math.PI) < 1e-4) return '2π';
    return '−2π';
  };

  const yLabel = (v: number) => {
    if (!yPiTicks) return String(v);
    if (Math.abs(v) < 1e-4) return '0';
    if (Math.abs(v - Math.PI / 2) < 1e-4) return 'π/2';
    if (Math.abs(v + Math.PI / 2) < 1e-4) return '−π/2';
    if (Math.abs(v - Math.PI) < 1e-4) return 'π';
    if (Math.abs(v + Math.PI) < 1e-4) return '−π';
    return pretty(v, 1);
  };

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#E6DDEC] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0E7F6] px-4 py-3">
        <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#5C4C71]">
          <CircleDot className="size-3.5 text-[#8B50E7]" /> PLANO CARTESIANO DINÁMICO
        </span>
        <span className="font-mono text-[10px] text-[#887B93]">
          Cálculo analítico y geométrico en tiempo real
        </span>
      </div>

      <svg
        viewBox="0 0 680 345"
        role="img"
        aria-label={
          ariaDescription ??
          'Gráfica interactiva de ' +
            (level === 'secundaria'
              ? 'familias de funciones reales'
              : level === 'preuni'
                ? 'funciones trigonométricas directas e inversas'
                : 'cálculo diferencial e integral')
        }
        className="block w-full select-none bg-[#FEFCFF]"
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={left} y={top} width={right - left} height={bottom - top} />
          </clipPath>
        </defs>

        {/* Grid lines */}
        {xTicks.map((v) => (
          <g key={'x' + v}>
            <line x1={sx(v)} x2={sx(v)} y1={top} y2={bottom} stroke="#EFE8F6" />
            <text x={sx(v)} y={331} textAnchor="middle" fill="#9A8BA9" fontSize="11">
              {xLabel(v)}
            </text>
          </g>
        ))}
        {yTicks.map((v) => (
          <g key={'y' + v}>
            <line x1={left} x2={right} y1={sy(v)} y2={sy(v)} stroke="#EFE8F6" />
            <text x={44} y={sy(v) + 4} textAnchor="end" fill="#9A8BA9" fontSize="11">
              {yLabel(v)}
            </text>
          </g>
        ))}

        {/* Coordinate axes */}
        <path
          d={'M' + sx(0) + ',' + top + ' V' + bottom + ' M' + left + ',' + sy(0) + ' H' + right}
          stroke="#B8A7C9"
          strokeWidth="1.5"
        />

        <g clipPath={'url(#' + clipId + ')'}>
          {/* Riemann rectangles */}
          {riemannRects?.map((rect, idx) => {
            const xPos = sx(rect.x);
            const w = Math.max(1, sx(rect.x + rect.width) - xPos);
            const yZero = sy(0);
            const yTop = rect.y >= 0 ? sy(rect.y) : yZero;
            const hRect = Math.abs(sy(rect.y) - yZero);
            const isPos = rect.y >= 0;
            return (
              <rect
                key={'riemann-' + idx}
                x={xPos}
                y={yTop}
                width={w}
                height={hRect}
                fill={isPos ? 'rgba(121, 67, 230, 0.22)' : 'rgba(240, 120, 86, 0.24)'}
                stroke={isPos ? '#7943E6' : '#F07856'}
                strokeWidth="1"
              />
            );
          })}

          {/* Vertical asymptotes */}
          {vAsymptotes
            ?.filter((va) => va >= x.min && va <= x.max)
            .map((va, idx) => (
              <g key={'va-' + idx}>
                <line
                  x1={sx(va)}
                  x2={sx(va)}
                  y1={top}
                  y2={bottom}
                  stroke="#D9468F"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <text
                  x={sx(va) + 5}
                  y={top + 16}
                  fill="#C4367B"
                  fontSize="10"
                  fontWeight="bold"
                >
                  x = {pretty(va, 2)}
                </text>
              </g>
            ))}

          {/* Horizontal asymptotes */}
          {hAsymptotes
            ?.filter((ha) => ha >= y.min && ha <= y.max)
            .map((ha, idx) => (
              <g key={'ha-' + idx}>
                <line
                  x1={left}
                  x2={right}
                  y1={sy(ha)}
                  y2={sy(ha)}
                  stroke="#0EA5E9"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <text
                  x={left + 8}
                  y={sy(ha) - 6}
                  fill="#0284C7"
                  fontSize="10"
                  fontWeight="bold"
                >
                  y = {pretty(ha, 2)}
                </text>
              </g>
            ))}

          {/* Auxiliary reference curves */}
          {aux && (
            <path
              d={build(aux)}
              stroke="#E4A0B6"
              strokeDasharray="6 5"
              strokeWidth="2.2"
              fill="none"
            />
          )}
          {secondaryAux && (
            <path
              d={build(secondaryAux)}
              stroke="#10B981"
              strokeDasharray="4 4"
              strokeWidth="2.2"
              fill="none"
            />
          )}

          {/* Main continuous curve */}
          {plot && (
            <path
              d={build(plot)}
              stroke="#7943E6"
              strokeWidth="3.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          )}

          {/* Step segments for Floor / Greatest Integer function */}
          {stepSegments?.map((seg, idx) => (
            <g key={'step-' + idx}>
              <line
                x1={sx(seg.x1)}
                x2={sx(seg.x2)}
                y1={sy(seg.y)}
                y2={sy(seg.y)}
                stroke="#7943E6"
                strokeWidth="3.4"
                strokeLinecap="round"
              />
              <circle
                cx={sx(seg.x1)}
                cy={sy(seg.y)}
                r="4.2"
                fill="#7943E6"
                stroke="white"
                strokeWidth="1.5"
              />
              <circle
                cx={sx(seg.x2)}
                cy={sy(seg.y)}
                r="4.2"
                fill="white"
                stroke="#7943E6"
                strokeWidth="2.2"
              />
            </g>
          ))}

          {/* Differential triangle (Δx, Δy) */}
          {diffTriangle && (
            <g>
              <line
                x1={sx(diffTriangle.x0)}
                x2={sx(diffTriangle.x1)}
                y1={sy(diffTriangle.y0)}
                y2={sy(diffTriangle.y0)}
                stroke="#10B981"
                strokeWidth="1.8"
                strokeDasharray="3 3"
              />
              <line
                x1={sx(diffTriangle.x1)}
                x2={sx(diffTriangle.x1)}
                y1={sy(diffTriangle.y0)}
                y2={sy(diffTriangle.y1)}
                stroke="#10B981"
                strokeWidth="1.8"
                strokeDasharray="3 3"
              />
            </g>
          )}

          {/* Secant line */}
          {secant && (
            <path
              d={build(secant)}
              stroke="#10B981"
              strokeWidth="2.2"
              strokeDasharray="4 4"
              fill="none"
            />
          )}

          {/* Tangent line */}
          {tangent && (
            <path
              d={build(tangent)}
              stroke="#F07856"
              strokeWidth="2.5"
              strokeDasharray="7 5"
              fill="none"
            />
          )}

          {/* Real roots on X axis */}
          {roots
            ?.filter((v) => v >= x.min && v <= x.max)
            .map((v, i) => (
              <circle
                key={'root' + i}
                cx={sx(v)}
                cy={sy(0)}
                r="5.5"
                stroke="#7742DB"
                strokeWidth="2.5"
                fill="white"
              />
            ))}

          {/* Extra markers (domain endpoints, critical points, inflection points) */}
          {extraMarkers
            ?.filter((m) => m.x >= x.min && m.x <= x.max && m.y >= y.min && m.y <= y.max)
            .map((m, i) => (
              <g key={'extra-m-' + i}>
                <circle
                  cx={sx(m.x)}
                  cy={sy(m.y)}
                  r="5"
                  stroke={m.color ?? '#6733C7'}
                  strokeWidth="2.2"
                  fill={m.hollow ? 'white' : m.color ?? '#6733C7'}
                />
                {m.label && (
                  <text
                    x={sx(m.x) + 7}
                    y={sy(m.y) - 6}
                    fill="#4A3267"
                    fontSize="10"
                    fontWeight="bold"
                  >
                    {m.label}
                  </text>
                )}
              </g>
            ))}

          {/* Secondary marker (e.g. Q(x0+h, f(x0+h))) */}
          {secondaryMarker && Number.isFinite(secondaryMarker.y) && (
            <g>
              <circle
                cx={sx(secondaryMarker.x)}
                cy={sy(secondaryMarker.y)}
                r="5.5"
                stroke="white"
                strokeWidth="2"
                fill={secondaryMarker.color ?? '#10B981'}
              />
              {secondaryMarker.label && (
                <text
                  x={sx(secondaryMarker.x) + 8}
                  y={sy(secondaryMarker.y) - 6}
                  fill="#0F766E"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {secondaryMarker.label}
                </text>
              )}
            </g>
          )}

          {/* Primary marker (Vertex, Tangency Point, Center) */}
          {marker && Number.isFinite(marker.y) && (
            <g>
              <line
                x1={sx(marker.x)}
                x2={sx(marker.x)}
                y1={sy(0)}
                y2={sy(marker.y)}
                stroke="#BFA8E6"
                strokeDasharray="4 5"
              />
              <circle
                cx={sx(marker.x)}
                cy={sy(marker.y)}
                r="6"
                stroke="white"
                strokeWidth="2.5"
                fill={marker.color ?? '#F07856'}
              />
              {marker.label && (
                <text
                  x={sx(marker.x) + 8}
                  y={sy(marker.y) + 4}
                  fill="#C2410C"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {marker.label}
                </text>
              )}
            </g>
          )}
        </g>

        <text x={right - 4} y={sy(0) - 9} fill="#9482A7" fontSize="11" textAnchor="end">
          x
        </text>
        <text x={sx(0) + 10} y={top + 12} fill="#9482A7" fontSize="11">
          y
        </text>
      </svg>

      {/* Dynamic Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#F0E7F6] px-4 py-3 text-[10px] font-semibold text-[#7D6E8B]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <i className="h-0.5 w-4 rounded bg-[#7943E6]" />
            Función principal
          </span>
          {aux && (
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#E4A0B6]" />
              {auxLabel ?? 'Referencia'}
            </span>
          )}
          {secondaryAux && (
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#10B981]" />
              {secondaryAuxLabel ?? 'f′(x)'}
            </span>
          )}
          {tangent && (
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#F07856]" />
              Tangente
            </span>
          )}
          {secant && (
            <span className="inline-flex items-center gap-1.5">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#10B981]" />
              Secante
            </span>
          )}
          {vAsymptotes && vAsymptotes.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[#C4367B]">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#D9468F]" />
              Asíntota V.
            </span>
          )}
          {hAsymptotes && hAsymptotes.length > 0 && (
            <span className="inline-flex items-center gap-1.5 text-[#0284C7]">
              <i className="h-0.5 w-4 rounded border-t-2 border-dashed border-[#0EA5E9]" />
              Asíntota H.
            </span>
          )}
        </div>
        <span>Motor SVG matemático · sin líneas verticales falsas</span>
      </div>
    </div>
  );
}

export default function MathStudio() {
  const [level, setLevel] = useState<Level>('secundaria');

  // ── 1. Estado Nivel Secundaria (9 familias de funciones) ──
  const [familyId, setFamilyId] = useState<FunctionFamilyId>('cuadratica');
  const [a, setA] = useState(1);
  const [b, setB] = useState(-2);
  const [c, setC] = useState(-3);
  const [hShift, setHShift] = useState(1);
  const [kShift, setKShift] = useState(-2);
  const [radSign, setRadSign] = useState<1 | -1>(1);
  const [expBase, setExpBase] = useState(2);

  // ── 2. Estado Nivel Preuniversitario (Trigonometría Directa e Inversa) ──
  const [trigCategory, setTrigCategory] = useState<TrigCategory>('directas');
  const [directTrigId, setDirectTrigId] = useState<DirectTrigId>('sen');
  const [inverseTrigId, setInverseTrigId] = useState<InverseTrigId>('arcsen');
  const [amplitude, setAmplitude] = useState(1.5);
  const [frequency, setFrequency] = useState(2);
  const [phase, setPhase] = useState(0);
  const [trigVertShift, setTrigVertShift] = useState(0);
  const [invScaleA, setInvScaleA] = useState(1);
  const [invScaleB, setInvScaleB] = useState(1);
  const [invShiftH, setInvShiftH] = useState(0);
  const [invShiftD, setInvShiftD] = useState(0);

  // ── 3. Estado Nivel Universitario (Cálculo Diferencial e Integral) ──
  const [calcMode, setCalcMode] = useState<CalculusModeId>('derivada');
  const [calcFnId, setCalcFnId] = useState<CalculusFnId>('cubica');
  const [x0, setX0] = useState(0.8);
  const [h, setH] = useState(0.5);
  const [intA, setIntA] = useState(-1.5);
  const [intB, setIntB] = useState(1.5);
  const [riemannN, setRiemannN] = useState(12);
  const [riemannRule, setRiemannRule] = useState<RiemannRule>('midpoint');

  const quad = useMemo(() => quadraticFacts(a, b, c), [a, b, c]);
  const trig = useMemo(
    () => trigFacts(amplitude, frequency, phase, trigVertShift, directTrigId),
    [amplitude, frequency, phase, trigVertShift, directTrigId]
  );
  const invTrig = useMemo(
    () => inverseTrigFacts(inverseTrigId, invScaleA, invScaleB, invShiftH, invShiftD),
    [inverseTrigId, invScaleA, invScaleB, invShiftH, invShiftD]
  );
  const calculus = useMemo(() => calculusFacts(x0, h, calcFnId), [x0, h, calcFnId]);
  const riemann = useMemo(
    () => riemannFacts(calcFnId, intA, intB, riemannN, riemannRule),
    [calcFnId, intA, intB, riemannN, riemannRule]
  );

  const activeFamily = FUNCTION_FAMILIES.find((f) => f.id === familyId)!;
  const activeDirectTrig = DIRECT_TRIG_FNS.find((t) => t.id === directTrigId)!;
  const activeInverseTrig = INVERSE_TRIG_FNS.find((t) => t.id === inverseTrigId)!;
  const activeCalcMode = CALCULUS_MODES.find((m) => m.id === calcMode)!;
  const activeCalcFn = CALCULUS_FUNCTIONS.find((f) => f.id === calcFnId)!;

  const reset = () => {
    setA(1);
    setB(-2);
    setC(-3);
    setHShift(1);
    setKShift(-2);
    setRadSign(1);
    setExpBase(2);
    setAmplitude(1.5);
    setFrequency(2);
    setPhase(0);
    setTrigVertShift(0);
    setInvScaleA(1);
    setInvScaleB(1);
    setInvShiftH(0);
    setInvShiftD(0);
    setX0(0.8);
    setH(0.5);
    setIntA(-1.5);
    setIntB(1.5);
    setRiemannN(12);
  };

  // ── Construcción del Modelo Visual de Secundaria ──
  const secundariaView = useMemo(() => {
    const dom: GraphDomain = { x: { min: -4.5, max: 4.5 }, y: { min: -9, max: 9 } };
    const nonZeroA = Math.abs(a) < 1e-6 ? 0.5 : a;

    if (familyId === 'cuadratica') {
      return {
        domain: dom,
        plot: (x: number) => a * x * x + b * x + c,
        vAsymptotes: Math.abs(a) > 1e-6 ? [quad.vertexX] : [],
        hAsymptotes: [] as number[],
        roots: quad.roots,
        marker:
          Math.abs(a) > 1e-6
            ? { x: quad.vertexX, y: quad.vertexY, label: `V(${pretty(quad.vertexX, 1)}; ${pretty(quad.vertexY, 1)})` }
            : undefined,
        extraMarkers: [{ x: 0, y: c, label: `(0; ${pretty(c, 1)})`, color: '#0EA5E9' }],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(a)}x²${signedTerm(b, 'x')}${signedTerm(c)}`,
        domainStr: 'ℝ (−∞; +∞)',
        rangeStr:
          Math.abs(a) < 1e-6
            ? 'ℝ'
            : a > 0
              ? `[${pretty(quad.vertexY)}; +∞)`
              : `(−∞; ${pretty(quad.vertexY)}]`,
        line1:
          Math.abs(a) < 1e-6
            ? `Degenera en recta lineal (a = 0) · Corte Y: (0; ${pretty(c)})`
            : `Vértice (${pretty(quad.vertexX)}; ${pretty(quad.vertexY)}) · Δ = ${pretty(quad.discriminant)} · Concavidad: ${a > 0 ? '∪ (hacia arriba)' : '∩ (hacia abajo)'}`,
        line2:
          quad.discriminant < 0
            ? 'Sin raíces reales (Δ < 0, raíces complejas conjugadas)'
            : quad.roots.length === 1
              ? `Raíz real única: x = ${pretty(quad.roots[0])}`
              : `Raíces: ${pretty(quad.roots[0])} y ${pretty(quad.roots[1])} · Eje de simetría: x = ${pretty(quad.vertexX)}`,
      };
    }

    if (familyId === 'lineal') {
      const m = a;
      const interceptB = b;
      const rootX = Math.abs(m) > 1e-6 ? [-interceptB / m] : [];
      const angleDeg = (Math.atan(m) * 180) / Math.PI;
      return {
        domain: dom,
        plot: (x: number) => m * x + interceptB,
        vAsymptotes: [] as number[],
        hAsymptotes: [] as number[],
        roots: rootX,
        marker: { x: 0, y: interceptB, label: `(0; ${pretty(interceptB, 1)})` },
        extraMarkers:
          rootX.length > 0
            ? [{ x: rootX[0], y: 0, label: `(${pretty(rootX[0], 1)}; 0)`, color: '#10B981' }]
            : [],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(m)}x${signedTerm(interceptB)}`,
        domainStr: 'ℝ (−∞; +∞)',
        rangeStr: Math.abs(m) < 1e-6 ? `{${pretty(interceptB)}} (Constante)` : 'ℝ (−∞; +∞)',
        line1: `Pendiente m = ${pretty(m)} · Ángulo θ = ${pretty(angleDeg, 1)}° (${m > 0 ? 'Creciente' : m < 0 ? 'Decreciente' : 'Constante horizontal'})`,
        line2:
          rootX.length > 0
            ? `Raíz en eje X: x = ${pretty(rootX[0])} · Ordenada al origen: (0; ${pretty(interceptB)})`
            : `Recta paralela al eje X · Ordenada constante y = ${pretty(interceptB)}`,
      };
    }

    if (familyId === 'valor_absoluto') {
      const roots: number[] = [];
      if (Math.abs(nonZeroA) > 1e-6) {
        const rhs = -kShift / nonZeroA;
        if (Math.abs(rhs) < 1e-6) roots.push(hShift);
        else if (rhs > 0) roots.push(hShift - rhs, hShift + rhs);
      }
      return {
        domain: dom,
        plot: (x: number) => nonZeroA * Math.abs(x - hShift) + kShift,
        vAsymptotes: [hShift],
        hAsymptotes: [] as number[],
        roots,
        marker: { x: hShift, y: kShift, label: `V(${pretty(hShift, 1)}; ${pretty(kShift, 1)})` },
        extraMarkers: [{ x: 0, y: nonZeroA * Math.abs(hShift) + kShift, label: 'Corte Y', color: '#0EA5E9' }],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)}|x${signedTerm(-hShift)}|${signedTerm(kShift)}`,
        domainStr: 'ℝ (−∞; +∞)',
        rangeStr: nonZeroA > 0 ? `[${pretty(kShift)}; +∞)` : `(−∞; ${pretty(kShift)}]`,
        line1: `Vértice angular V(${pretty(hShift)}; ${pretty(kShift)}) · Eje de simetría: x = ${pretty(hShift)}`,
        line2: `Pendientes laterales: m₁ = −${pretty(nonZeroA)} y m₂ = +${pretty(nonZeroA)} · ${roots.length ? 'Raíces: ' + roots.map((r) => pretty(r)).join(' y ') : 'Sin raíces reales'}`,
      };
    }

    if (familyId === 'raiz') {
      const roots: number[] = [];
      if (Math.abs(nonZeroA) > 1e-6 && -kShift / nonZeroA >= 0) {
        const u = -kShift / nonZeroA;
        roots.push(hShift + radSign * u * u);
      }
      return {
        domain: dom,
        plot: (x: number) => {
          const inside = radSign * (x - hShift);
          return inside < 0 ? NaN : nonZeroA * Math.sqrt(inside) + kShift;
        },
        vAsymptotes: [] as number[],
        hAsymptotes: [] as number[],
        roots,
        marker: { x: hShift, y: kShift, label: `Inicio (${pretty(hShift, 1)}; ${pretty(kShift, 1)})` },
        extraMarkers: [],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)}√(${radSign === 1 ? '' : '−'}(x${signedTerm(-hShift)}))${signedTerm(kShift)}`,
        domainStr: radSign === 1 ? `[${pretty(hShift)}; +∞)` : `(−∞; ${pretty(hShift)}]`,
        rangeStr: nonZeroA >= 0 ? `[${pretty(kShift)}; +∞)` : `(−∞; ${pretty(kShift)}]`,
        line1: `Punto frontera inicial: (${pretty(hShift)}; ${pretty(kShift)}) · Orientación: ${radSign === 1 ? 'Derecha (+x)' : 'Izquierda (−x)'}`,
        line2:
          roots.length > 0
            ? `Cero de la función (raíz): x = ${pretty(roots[0])}`
            : 'La curva no corta al eje X para estos parámetros.',
      };
    }

    if (familyId === 'racional') {
      const roots = Math.abs(kShift) > 1e-6 ? [hShift - nonZeroA / kShift] : [];
      return {
        domain: dom,
        plot: (x: number) => (Math.abs(x - hShift) < 0.025 ? NaN : nonZeroA / (x - hShift) + kShift),
        vAsymptotes: [hShift],
        hAsymptotes: [kShift],
        roots,
        marker: { x: hShift, y: kShift, label: `Centro (${pretty(hShift, 1)}; ${pretty(kShift, 1)})`, color: '#8B5CF6' },
        extraMarkers: [],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)} / (x${signedTerm(-hShift)}) ${signedTerm(kShift, '', true)}`,
        domainStr: `ℝ \\ {${pretty(hShift)}}`,
        rangeStr: `ℝ \\ {${pretty(kShift)}}`,
        line1: `Asíntota Vertical: x = ${pretty(hShift)} · Asíntota Horizontal: y = ${pretty(kShift)}`,
        line2: `Ramas hiperbólicas en cuadrantes ${nonZeroA > 0 ? 'I y III' : 'II y IV'} respecto al centro (${pretty(hShift)}; ${pretty(kShift)})`,
      };
    }

    if (familyId === 'cubica') {
      const extra: PointMarker[] = [];
      if (nonZeroA * b < 0) {
        const dx = Math.sqrt(-b / (3 * nonZeroA));
        const x1 = hShift - dx;
        const x2 = hShift + dx;
        const y1 = nonZeroA * Math.pow(x1 - hShift, 3) + b * (x1 - hShift) + kShift;
        const y2 = nonZeroA * Math.pow(x2 - hShift, 3) + b * (x2 - hShift) + kShift;
        extra.push(
          { x: x1, y: y1, label: 'Ext₁', color: '#10B981' },
          { x: x2, y: y2, label: 'Ext₂', color: '#10B981' }
        );
      }
      return {
        domain: dom,
        plot: (x: number) => nonZeroA * Math.pow(x - hShift, 3) + b * (x - hShift) + kShift,
        vAsymptotes: [] as number[],
        hAsymptotes: [] as number[],
        roots: [] as number[],
        marker: { x: hShift, y: kShift, label: `Inflexión (${pretty(hShift, 1)}; ${pretty(kShift, 1)})` },
        extraMarkers: extra,
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)}(x${signedTerm(-hShift)})³${signedTerm(b, `(x${signedTerm(-hShift)})`)}${signedTerm(kShift)}`,
        domainStr: 'ℝ (−∞; +∞)',
        rangeStr: 'ℝ (−∞; +∞)',
        line1: `Punto de inflexión simétrico: I(${pretty(hShift)}; ${pretty(kShift)}) · Cambio de concavidad`,
        line2:
          extra.length > 0
            ? `Posee 2 extremos locales (máximo y mínimo relativos) porque a·b < 0.`
            : `Función estrictamente monótona en todo ℝ (sin extremos locales).`,
      };
    }

    if (familyId === 'exponencial') {
      const safeBase = Math.max(0.25, expBase);
      const roots: number[] = [];
      if (-kShift / nonZeroA > 0 && Math.abs(safeBase - 1) > 1e-6) {
        roots.push(hShift + Math.log(-kShift / nonZeroA) / Math.log(safeBase));
      }
      return {
        domain: dom,
        plot: (x: number) => nonZeroA * Math.pow(safeBase, x - hShift) + kShift,
        vAsymptotes: [] as number[],
        hAsymptotes: [kShift],
        roots,
        marker: { x: hShift, y: nonZeroA + kShift, label: `P(${pretty(hShift, 1)}; ${pretty(nonZeroA + kShift, 1)})` },
        extraMarkers: [],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)} · (${pretty(safeBase)})^(x${signedTerm(-hShift)})${signedTerm(kShift)}`,
        domainStr: 'ℝ (−∞; +∞)',
        rangeStr: nonZeroA > 0 ? `(${pretty(kShift)}; +∞)` : `(−∞; ${pretty(kShift)})`,
        line1: `Asíntota Horizontal: y = ${pretty(kShift)} · Punto base (x = ${pretty(hShift)}): y = ${pretty(nonZeroA + kShift)}`,
        line2: `Régimen: ${safeBase > 1 ? 'Crecimiento exponencial (b > 1)' : safeBase < 1 ? 'Decaimiento exponencial (0 < b < 1)' : 'Constante (b = 1)'}`,
      };
    }

    if (familyId === 'logaritmica') {
      const rootX = hShift + Math.exp(-kShift / nonZeroA);
      return {
        domain: dom,
        plot: (x: number) => (x <= hShift + 0.005 ? NaN : nonZeroA * Math.log(x - hShift) + kShift),
        vAsymptotes: [hShift],
        hAsymptotes: [] as number[],
        roots: [rootX],
        marker: { x: hShift + 1, y: kShift, label: `(${pretty(hShift + 1, 1)}; ${pretty(kShift, 1)})` },
        extraMarkers: [],
        stepSegments: undefined,
        equation: `f(x) = ${pretty(nonZeroA)} · ln(x${signedTerm(-hShift)})${signedTerm(kShift)}`,
        domainStr: `(${pretty(hShift)}; +∞)`,
        rangeStr: 'ℝ (−∞; +∞)',
        line1: `Asíntota Vertical: x = ${pretty(hShift)} · Punto canónico (h+1; k) = (${pretty(hShift + 1)}; ${pretty(kShift)})`,
        line2: `Raíz exacta en eje X: x = ${pretty(rootX)} · Función inversa de la exponencial.`,
      };
    }

    // escalon: f(x) = a * floor(b * (x - h)) + k
    const scaleB = Math.max(0.5, Math.abs(b) < 0.5 ? 1 : Math.abs(b));
    const stepLen = 1 / scaleB;
    const segments: StepSegment[] = [];
    for (let n = -12; n <= 12; n++) {
      const x1 = hShift + n * stepLen;
      const x2 = x1 + stepLen;
      const yVal = nonZeroA * n + kShift;
      if (x2 >= dom.x.min && x1 <= dom.x.max && yVal >= dom.y.min && yVal <= dom.y.max) {
        segments.push({ x1, x2, y: yVal });
      }
    }
    return {
      domain: dom,
      plot: undefined,
      vAsymptotes: [] as number[],
      hAsymptotes: [] as number[],
      roots: [] as number[],
      marker: { x: hShift, y: kShift, label: `(${pretty(hShift, 1)}; ${pretty(kShift, 1)})` },
      extraMarkers: [],
      stepSegments: segments,
      equation: `f(x) = ${pretty(nonZeroA)}⌊${pretty(scaleB)}(x${signedTerm(-hShift)})⌋${signedTerm(kShift)}`,
      domainStr: 'ℝ (−∞; +∞)',
      rangeStr: `{${pretty(nonZeroA)}n + ${pretty(kShift)} | n ∈ ℤ} (Valores discretos)`,
      line1: `Longitud de cada peldaño: L = 1/${pretty(scaleB)} = ${pretty(stepLen)} · Salto vertical: Δy = ${pretty(Math.abs(nonZeroA))}`,
      line2: `Discontinuidades de salto finito en x = ${pretty(hShift)} + n·(${pretty(stepLen)}) con n ∈ ℤ.`,
    };
  }, [familyId, a, b, c, hShift, kShift, radSign, expBase, quad]);

  // ── Construcción del Modelo Visual de Trigonometría (Directas e Inversas) ──
  const preuniView = useMemo(() => {
    if (trigCategory === 'directas') {
      const dom: GraphDomain = { x: { min: -2 * Math.PI, max: 2 * Math.PI }, y: { min: -4, max: 4 } };
      const phiRad = (phase * Math.PI) / 180;
      const arg = (x: number) => frequency * x + phiRad;

      const plotFn = (x: number) => {
        const u = arg(x);
        if (directTrigId === 'sen') return amplitude * Math.sin(u) + trigVertShift;
        if (directTrigId === 'cos') return amplitude * Math.cos(u) + trigVertShift;
        if (directTrigId === 'tan') {
          const cVal = Math.cos(u);
          return Math.abs(cVal) < 0.03 ? NaN : amplitude * (Math.sin(u) / cVal) + trigVertShift;
        }
        if (directTrigId === 'cot') {
          const sVal = Math.sin(u);
          return Math.abs(sVal) < 0.03 ? NaN : amplitude * (Math.cos(u) / sVal) + trigVertShift;
        }
        if (directTrigId === 'sec') {
          const cVal = Math.cos(u);
          return Math.abs(cVal) < 0.03 ? NaN : amplitude / cVal + trigVertShift;
        }
        const sVal = Math.sin(u);
        return Math.abs(sVal) < 0.03 ? NaN : amplitude / sVal + trigVertShift;
      };

      const auxFn =
        directTrigId === 'sec'
          ? (x: number) => amplitude * Math.cos(arg(x)) + trigVertShift
          : directTrigId === 'csc'
            ? (x: number) => amplitude * Math.sin(arg(x)) + trigVertShift
            : directTrigId === 'sen'
              ? (x: number) => Math.sin(x)
              : directTrigId === 'cos'
                ? (x: number) => Math.cos(x)
                : undefined;

      const auxLabel =
        directTrigId === 'sec'
          ? 'Envolvente A·cos'
          : directTrigId === 'csc'
            ? 'Envolvente A·sen'
            : 'Curva canónica base';

      const yLow = trigVertShift - Math.abs(amplitude);
      const yHigh = trigVertShift + Math.abs(amplitude);
      const domainStr =
        directTrigId === 'sen' || directTrigId === 'cos'
          ? 'ℝ (−∞; +∞)'
          : directTrigId === 'tan' || directTrigId === 'sec'
            ? `ℝ \\ {x | ${pretty(frequency)}x + ${phase}° = 90° + 180°n}`
            : `ℝ \\ {x | ${pretty(frequency)}x + ${phase}° = 180°n}`;

      const rangeStr =
        directTrigId === 'sen' || directTrigId === 'cos'
          ? `[${pretty(yLow)}; ${pretty(yHigh)}]`
          : directTrigId === 'tan' || directTrigId === 'cot'
            ? 'ℝ (−∞; +∞)'
            : `(−∞; ${pretty(yLow)}] ∪ [${pretty(yHigh)}; +∞)`;

      return {
        domain: dom,
        plot: plotFn,
        aux: auxFn,
        auxLabel,
        vAsymptotes: trig.asymptotes,
        hAsymptotes: [] as number[],
        extraMarkers: [] as PointMarker[],
        yPiTicks: false,
        equation: `y = ${pretty(amplitude)} ${activeDirectTrig.symbol}(${pretty(frequency)}x ${phase >= 0 ? '+' : '−'} ${Math.abs(phase)}°)${signedTerm(trigVertShift)}`,
        domainStr,
        rangeStr,
        line1: `Amplitud/Escala: ${pretty(trig.amplitude)} · Período: T = ${pretty(trig.period)} rad · Desfase: ${pretty(trig.shift)} rad`,
        line2:
          trig.asymptotes.length > 0
            ? `Posee ${trig.asymptotes.length} asíntotas verticales en [−2π; 2π] · Eje medio: y = ${pretty(trigVertShift)}`
            : `Oscilación continua entre [${pretty(yLow)}; ${pretty(yHigh)}] con eje medio y = ${pretty(trigVertShift)}`,
      };
    }

    // Funciones Trigonométricas Inversas (Arco)
    const dom: GraphDomain = { x: { min: -4, max: 4 }, y: { min: -4.2, max: 4.2 } };
    const bAbs = Math.max(0.25, invScaleB);
    const uVal = (x: number) => bAbs * (x - invShiftH);

    const plotFn = (x: number) => {
      const u = uVal(x);
      if (inverseTrigId === 'arcsen') {
        return Math.abs(u) > 1 ? NaN : invScaleA * Math.asin(u) + invShiftD;
      }
      if (inverseTrigId === 'arccos') {
        return Math.abs(u) > 1 ? NaN : invScaleA * Math.acos(u) + invShiftD;
      }
      if (inverseTrigId === 'arctan') {
        return invScaleA * Math.atan(u) + invShiftD;
      }
      if (inverseTrigId === 'arccot') {
        return invScaleA * (Math.PI / 2 - Math.atan(u)) + invShiftD;
      }
      if (inverseTrigId === 'arcsec') {
        return Math.abs(u) < 1 ? NaN : invScaleA * Math.acos(1 / u) + invShiftD;
      }
      // arccsc
      return Math.abs(u) < 1 ? NaN : invScaleA * Math.asin(1 / u) + invShiftD;
    };

    return {
      domain: dom,
      plot: plotFn,
      aux: undefined,
      auxLabel: undefined,
      vAsymptotes: [] as number[],
      hAsymptotes: invTrig.hAsymptotes,
      extraMarkers: invTrig.endpoints,
      yPiTicks: true,
      equation: `y = ${pretty(invScaleA)} ${activeInverseTrig.symbol}(${pretty(bAbs)}(x${signedTerm(-invShiftH)}))${signedTerm(invShiftD)}`,
      domainStr: invTrig.domainText,
      rangeStr: invTrig.rangeText,
      line1: `Dominio principal: ${invTrig.domainText} · Rango principal: ${invTrig.rangeText}`,
      line2:
        invTrig.hAsymptotes.length > 0
          ? `Asíntotas horizontales en: ${invTrig.hAsymptotes.map((ha) => 'y = ' + pretty(ha)).join(' y ')}`
          : `Curva acotada con puntos terminales cerrados en los extremos del dominio.`,
    };
  }, [
    trigCategory,
    directTrigId,
    inverseTrigId,
    amplitude,
    frequency,
    phase,
    trigVertShift,
    invScaleA,
    invScaleB,
    invShiftH,
    invShiftD,
    trig,
    invTrig,
    activeDirectTrig,
    activeInverseTrig,
  ]);

  // ── Construcción del Modelo Visual de Cálculo Universitario ──
  const universidadView = useMemo(() => {
    const dom: GraphDomain = { x: { min: -2.6, max: 2.6 }, y: { min: -7.5, max: 7.5 } };
    const fnObj = activeCalcFn;

    if (calcMode === 'derivada') {
      const x1 = x0 + h;
      const y0 = calculus.y;
      const y1 = calculus.yNext;
      return {
        domain: dom,
        plot: fnObj.f,
        aux: undefined,
        auxLabel: undefined,
        secondaryAux: undefined,
        secondaryAuxLabel: undefined,
        tangent: (x: number) => y0 + calculus.exact * (x - x0),
        secant: (x: number) => y0 + calculus.approximate * (x - x0),
        marker: { x: x0, y: y0, label: `P(${pretty(x0, 1)}; ${pretty(y0, 1)})`, color: '#F07856' },
        secondaryMarker: { x: x1, y: y1, label: `Q(x₀+h)`, color: '#10B981' },
        extraMarkers: [] as PointMarker[],
        riemannRects: undefined,
        diffTriangle: { x0, y0, x1, y1 },
      };
    }

    if (calcMode === 'integral') {
      return {
        domain: dom,
        plot: fnObj.f,
        aux: undefined,
        auxLabel: undefined,
        secondaryAux: undefined,
        secondaryAuxLabel: undefined,
        tangent: undefined,
        secant: undefined,
        marker: undefined,
        secondaryMarker: undefined,
        extraMarkers: [
          { x: Math.min(intA, intB), y: 0, label: `a=${pretty(Math.min(intA, intB), 1)}`, color: '#6733C7' },
          { x: Math.max(intA, intB), y: 0, label: `b=${pretty(Math.max(intA, intB), 1)}`, color: '#6733C7' },
        ],
        riemannRects: riemann.rects,
        diffTriangle: undefined,
      };
    }

    // Modo 'curva': Superposición de f(x), f'(x) y f''(x)
    const critMarkers: PointMarker[] = fnObj.criticalPoints.map((cx, idx) => ({
      x: cx,
      y: fnObj.f(cx),
      label: `C${idx + 1}`,
      color: '#10B981',
    }));
    const inflMarkers: PointMarker[] = fnObj.inflectionPoints.map((ix, idx) => ({
      x: ix,
      y: fnObj.f(ix),
      label: `I${idx + 1}`,
      color: '#0EA5E9',
    }));

    return {
      domain: dom,
      plot: fnObj.f,
      aux: fnObj.d2f,
      auxLabel: '2.ª derivada f″(x)',
      secondaryAux: fnObj.df,
      secondaryAuxLabel: '1.ª derivada f′(x)',
      tangent: (x: number) => calculus.y + calculus.exact * (x - x0),
      secant: undefined,
      marker: { x: x0, y: calculus.y, label: `P(${pretty(x0, 1)})`, color: '#F07856' },
      secondaryMarker: undefined,
      extraMarkers: [...critMarkers, ...inflMarkers],
      riemannRects: undefined,
      diffTriangle: undefined,
    };
  }, [calcMode, activeCalcFn, x0, h, intA, intB, calculus, riemann]);

  return (
    <section
      aria-label="Laboratorio de matemáticas interactivo"
      className="overflow-hidden rounded-[28px] border border-[#DFD1ED] bg-white shadow-[0_28px_100px_rgba(55,25,110,0.13)]"
    >
      {/* Top Studio Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EADFF5] bg-gradient-to-r from-[#F8F2FF] to-[#FFF8FB] px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-[#6736D7] text-white">
            <ChartNoAxesCombined className="size-5" />
          </span>
          <div>
            <p className="font-display text-sm font-bold tracking-[-.02em] text-[#27173F]">
              MATH STUDIO <span className="text-[#8358C5]">/ LIVE</span>
            </p>
            <p className="mt-0.5 text-[10px] text-[#897C98]">
              Explora familias de funciones, trigonometría directa/inversa y cálculo en tiempo real.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9EC] bg-white/90 px-3 py-1.5 text-[10px] font-bold text-[#7352A9]">
            <span className="size-1.5 rounded-full bg-[#27B58A]" /> 25 modelos matemáticos interactivos
          </span>
        </div>
      </div>

      {/* Main Academic Level Tabs */}
      <div
        role="tablist"
        aria-label="Elegir nivel académico"
        className="grid grid-cols-3 gap-1.5 bg-[#F8F5FD] p-2 sm:gap-2.5 sm:p-3"
      >
        {LEVELS.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            aria-selected={level === item.id}
            onClick={() => setLevel(item.id)}
            className={
              'min-w-0 rounded-xl border px-2.5 py-3 text-left transition sm:px-4 ' +
              (level === item.id
                ? 'border-[#C8B0EB] bg-white shadow-[0_4px_18px_rgba(86,42,128,.08)]'
                : 'border-transparent bg-transparent hover:bg-white/70')
            }
          >
            <div className="flex flex-wrap items-center justify-between gap-1">
              <span
                className={
                  'block text-[10px] font-bold leading-4 sm:text-xs ' +
                  (level === item.id ? 'text-[#6E39CE]' : 'text-[#897B96]')
                }
              >
                {item.stage}
              </span>
              <span className="hidden rounded-full bg-[#F2EAFA] px-2 py-0.5 text-[9px] font-extrabold text-[#6D3BC7] sm:inline-block">
                {item.badge}
              </span>
            </div>
            <span className="mt-0.5 block text-[11px] font-extrabold text-[#3C2A4B] sm:text-sm">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Sub-navigation bar depending on active academic level */}
      <div className="border-b border-[#EFE6F7] bg-[#FCFAFF] px-4 py-3 sm:px-6">
        {level === 'secundaria' && (
          <div>
            <div className="mb-2 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.12em] text-[#7A4BC7]">
                <Layers className="size-3.5" /> Catálogo de 9 Familias de Funciones Reales
              </span>
              <span className="font-mono text-[10px] font-bold text-[#8A789B]">
                {activeFamily.formulaTemplate}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {FUNCTION_FAMILIES.map((fam) => (
                <button
                  key={fam.id}
                  type="button"
                  onClick={() => setFamilyId(fam.id)}
                  className={
                    'rounded-lg border px-2.5 py-1.5 text-[11px] font-bold transition ' +
                    (familyId === fam.id
                      ? 'border-[#6D37CE] bg-[#6D37CE] text-white shadow-sm'
                      : 'border-[#E3D6F0] bg-white text-[#523F66] hover:border-[#C6AEE0] hover:bg-[#F7F2FC]')
                  }
                >
                  {fam.short}
                </button>
              ))}
            </div>
          </div>
        )}

        {level === 'preuni' && (
          <div className="space-y-2.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="inline-flex rounded-xl border border-[#DFD0EE] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setTrigCategory('directas')}
                  className={
                    'rounded-lg px-3 py-1 text-xs font-extrabold transition ' +
                    (trigCategory === 'directas'
                      ? 'bg-[#6733C7] text-white'
                      : 'text-[#635175] hover:bg-[#F5EEFC]')
                  }
                >
                  Funciones Directas (6)
                </button>
                <button
                  type="button"
                  onClick={() => setTrigCategory('inversas')}
                  className={
                    'rounded-lg px-3 py-1 text-xs font-extrabold transition ' +
                    (trigCategory === 'inversas'
                      ? 'bg-[#6733C7] text-white'
                      : 'text-[#635175] hover:bg-[#F5EEFC]')
                  }
                >
                  Funciones Inversas / Arco (6)
                </button>
              </div>
              <span className="font-mono text-[10px] font-bold text-[#7D6891]">
                {trigCategory === 'directas'
                  ? 'sen · cos · tan · cot · sec · csc'
                  : 'arcsen · arccos · arctan · arccot · arcsec · arccsc'}
              </span>
            </div>

            {trigCategory === 'directas' ? (
              <div className="flex flex-wrap gap-1.5">
                {DIRECT_TRIG_FNS.map((fn) => (
                  <button
                    key={fn.id}
                    type="button"
                    onClick={() => setDirectTrigId(fn.id)}
                    className={
                      'rounded-lg border px-3 py-1.5 text-xs font-bold transition ' +
                      (directTrigId === fn.id
                        ? 'border-[#6D37CE] bg-[#6D37CE] text-white shadow-sm'
                        : 'border-[#E3D6F0] bg-white text-[#523F66] hover:border-[#C6AEE0]')
                    }
                  >
                    {fn.name} ({fn.symbol})
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {INVERSE_TRIG_FNS.map((fn) => (
                  <button
                    key={fn.id}
                    type="button"
                    onClick={() => setInverseTrigId(fn.id)}
                    className={
                      'rounded-lg border px-3 py-1.5 text-xs font-bold transition ' +
                      (inverseTrigId === fn.id
                        ? 'border-[#6D37CE] bg-[#6D37CE] text-white shadow-sm'
                        : 'border-[#E3D6F0] bg-white text-[#523F66] hover:border-[#C6AEE0]')
                    }
                  >
                    {fn.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {level === 'universidad' && (
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-1.5">
              {CALCULUS_MODES.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCalcMode(m.id)}
                  className={
                    'rounded-lg border px-3 py-1.5 text-xs font-bold transition ' +
                    (calcMode === m.id
                      ? 'border-[#6D37CE] bg-[#6D37CE] text-white shadow-sm'
                      : 'border-[#E3D6F0] bg-white text-[#523F66] hover:border-[#C6AEE0]')
                  }
                >
                  {m.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#847198]">
                Función f(x):
              </span>
              {CALCULUS_FUNCTIONS.map((cf) => (
                <button
                  key={cf.id}
                  type="button"
                  onClick={() => setCalcFnId(cf.id)}
                  className={
                    'rounded-md border px-2 py-1 font-mono text-[11px] font-bold transition ' +
                    (calcFnId === cf.id
                      ? 'border-[#7E42DF] bg-[#EFE5FF] text-[#5B26B8]'
                      : 'border-[#E5DAEF] bg-white text-[#69587A] hover:bg-[#F7F2FC]')
                  }
                >
                  {cf.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[.76fr_1.24fr] lg:gap-6">
        <div className="flex flex-col">
          <span className="mb-1.5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#976DCE]">
            <Compass className="size-3.5" /> Módulo de exploración
          </span>

          <h3 className="font-display text-xl font-bold leading-tight text-[#2F1A4C] sm:text-2xl">
            {level === 'secundaria'
              ? activeFamily.title
              : level === 'preuni'
                ? trigCategory === 'directas'
                  ? `Función ${activeDirectTrig.name} (${activeDirectTrig.symbol})`
                  : `Función ${activeInverseTrig.name}`
                : activeCalcMode.title}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-[#7A6B88]">
            {level === 'secundaria'
              ? activeFamily.note
              : level === 'preuni'
                ? trigCategory === 'directas'
                  ? activeDirectTrig.note
                  : activeInverseTrig.note
                : activeCalcMode.note}
          </p>

          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5A496B]">
              <SlidersHorizontal className="size-4 text-[#8350D8]" /> Parámetros del modelo
            </span>
            <button
              type="button"
              onClick={reset}
              className="text-[11px] font-bold text-[#7445BD] hover:underline"
            >
              Reiniciar valores
            </button>
          </div>

          {/* Dynamic Parameter Controls */}
          <div className="mt-2 grid gap-2">
            {level === 'secundaria' && familyId === 'cuadratica' && (
              <>
                <Range
                  caption="Coeficiente cuadrático (concavidad)"
                  symbol="a"
                  min={-2.5}
                  max={2.5}
                  step={0.5}
                  value={a}
                  onChange={setA}
                />
                <Range
                  caption="Coeficiente lineal"
                  symbol="b"
                  min={-4}
                  max={4}
                  step={1}
                  value={b}
                  onChange={setB}
                />
                <Range
                  caption="Término independiente (corte Y)"
                  symbol="c"
                  min={-4}
                  max={4}
                  step={1}
                  value={c}
                  onChange={setC}
                />
              </>
            )}

            {level === 'secundaria' && familyId === 'lineal' && (
              <>
                <Range
                  caption="Pendiente (inclinación)"
                  symbol="m"
                  min={-3.5}
                  max={3.5}
                  step={0.5}
                  value={a}
                  onChange={setA}
                />
                <Range
                  caption="Ordenada al origen (corte Y)"
                  symbol="b"
                  min={-5}
                  max={5}
                  step={0.5}
                  value={b}
                  onChange={setB}
                />
              </>
            )}

            {level === 'secundaria' &&
              (familyId === 'valor_absoluto' ||
                familyId === 'racional' ||
                familyId === 'logaritmica') && (
                <>
                  <Range
                    caption="Factor de escala vertical / abertura"
                    symbol="a"
                    min={-3}
                    max={3}
                    step={0.5}
                    value={a}
                    onChange={(v) => setA(v === 0 ? 0.5 : v)}
                  />
                  <Range
                    caption="Desplazamiento horizontal / asíntota"
                    symbol="h"
                    min={-2.5}
                    max={2.5}
                    step={0.5}
                    value={hShift}
                    onChange={setHShift}
                  />
                  <Range
                    caption="Desplazamiento vertical"
                    symbol="k"
                    min={-4}
                    max={4}
                    step={0.5}
                    value={kShift}
                    onChange={setKShift}
                  />
                </>
              )}

            {level === 'secundaria' && familyId === 'raiz' && (
              <>
                <Range
                  caption="Escala vertical"
                  symbol="a"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={a}
                  onChange={(v) => setA(v === 0 ? 0.5 : v)}
                />
                <Range
                  caption="Abscisa de inicio"
                  symbol="h"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={hShift}
                  onChange={setHShift}
                />
                <Range
                  caption="Ordenada de inicio"
                  symbol="k"
                  min={-4}
                  max={4}
                  step={0.5}
                  value={kShift}
                  onChange={setKShift}
                />
                <div className="flex items-center justify-between rounded-xl border border-[#E8E1F3] bg-white px-3 py-2">
                  <span className="text-[11px] font-semibold text-[#625374]">
                    Dirección del radical
                  </span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setRadSign(1)}
                      className={
                        'rounded-md px-2.5 py-1 text-[11px] font-bold ' +
                        (radSign === 1 ? 'bg-[#6733C7] text-white' : 'bg-[#F3ECFC] text-[#5B3E85]')
                      }
                    >
                      √(x − h) →
                    </button>
                    <button
                      type="button"
                      onClick={() => setRadSign(-1)}
                      className={
                        'rounded-md px-2.5 py-1 text-[11px] font-bold ' +
                        (radSign === -1 ? 'bg-[#6733C7] text-white' : 'bg-[#F3ECFC] text-[#5B3E85]')
                      }
                    >
                      ← √(h − x)
                    </button>
                  </div>
                </div>
              </>
            )}

            {level === 'secundaria' && familyId === 'cubica' && (
              <>
                <Range
                  caption="Coeficiente cúbico"
                  symbol="a"
                  min={-2}
                  max={2}
                  step={0.5}
                  value={a}
                  onChange={(v) => setA(v === 0 ? 0.5 : v)}
                />
                <Range
                  caption="Término lineal (genera extremos si a·b < 0)"
                  symbol="b"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={b}
                  onChange={setB}
                />
                <Range
                  caption="Abscisa de inflexión"
                  symbol="h"
                  min={-2}
                  max={2}
                  step={0.5}
                  value={hShift}
                  onChange={setHShift}
                />
                <Range
                  caption="Ordenada de inflexión"
                  symbol="k"
                  min={-3}
                  max={3}
                  step={0.5}
                  value={kShift}
                  onChange={setKShift}
                />
              </>
            )}

            {level === 'secundaria' && familyId === 'exponencial' && (
              <>
                <Range
                  caption="Coeficiente inicial"
                  symbol="a"
                  min={-2.5}
                  max={2.5}
                  step={0.5}
                  value={a}
                  onChange={(v) => setA(v === 0 ? 0.5 : v)}
                />
                <Range
                  caption="Base exponencial (b < 1 decae, b > 1 crece)"
                  symbol="b"
                  min={0.5}
                  max={3}
                  step={0.25}
                  value={expBase}
                  onChange={setExpBase}
                />
                <Range
                  caption="Asíntota horizontal"
                  symbol="k"
                  min={-4}
                  max={4}
                  step={0.5}
                  value={kShift}
                  onChange={setKShift}
                />
              </>
            )}

            {level === 'secundaria' && familyId === 'escalon' && (
              <>
                <Range
                  caption="Salto vertical entre peldaños"
                  symbol="a"
                  min={-2.5}
                  max={2.5}
                  step={0.5}
                  value={a}
                  onChange={(v) => setA(v === 0 ? 1 : v)}
                />
                <Range
                  caption="Frecuencia de escalón (L = 1/b)"
                  symbol="b"
                  min={0.5}
                  max={2}
                  step={0.5}
                  value={b < 0.5 ? 1 : b}
                  onChange={setB}
                />
                <Range
                  caption="Desfase horizontal"
                  symbol="h"
                  min={-2}
                  max={2}
                  step={0.5}
                  value={hShift}
                  onChange={setHShift}
                />
                <Range
                  caption="Desplazamiento vertical"
                  symbol="k"
                  min={-3}
                  max={3}
                  step={1}
                  value={kShift}
                  onChange={setKShift}
                />
              </>
            )}

            {level === 'preuni' && trigCategory === 'directas' && (
              <>
                <Range
                  caption="Amplitud / Escala vertical"
                  symbol="A"
                  min={0.5}
                  max={2.5}
                  step={0.5}
                  value={amplitude}
                  onChange={setAmplitude}
                />
                <Range
                  caption="Frecuencia angular (ciclos)"
                  symbol="k"
                  min={0.5}
                  max={3}
                  step={0.5}
                  value={frequency}
                  onChange={setFrequency}
                />
                <Range
                  caption="Ángulo de fase inicial (grados)"
                  symbol="φ°"
                  min={-180}
                  max={180}
                  step={45}
                  value={phase}
                  onChange={setPhase}
                />
                <Range
                  caption="Desplazamiento vertical (eje medio)"
                  symbol="D"
                  min={-1.5}
                  max={1.5}
                  step={0.5}
                  value={trigVertShift}
                  onChange={setTrigVertShift}
                />
              </>
            )}

            {level === 'preuni' && trigCategory === 'inversas' && (
              <>
                <Range
                  caption="Factor de escala en rango (múltiplo de π)"
                  symbol="A"
                  min={0.5}
                  max={2}
                  step={0.25}
                  value={invScaleA}
                  onChange={setInvScaleA}
                />
                <Range
                  caption="Factor de compresión de dominio"
                  symbol="B"
                  min={0.5}
                  max={2}
                  step={0.25}
                  value={invScaleB}
                  onChange={setInvScaleB}
                />
                <Range
                  caption="Centro horizontal"
                  symbol="h"
                  min={-1.5}
                  max={1.5}
                  step={0.5}
                  value={invShiftH}
                  onChange={setInvShiftH}
                />
                <Range
                  caption="Desplazamiento vertical"
                  symbol="D"
                  min={-1}
                  max={1}
                  step={0.5}
                  value={invShiftD}
                  onChange={setInvShiftD}
                />
              </>
            )}

            {level === 'universidad' && calcMode === 'derivada' && (
              <>
                <Range
                  caption="Punto de tangencia (abscisa)"
                  symbol="x₀"
                  min={-1.8}
                  max={1.8}
                  step={0.1}
                  value={x0}
                  onChange={setX0}
                />
                <Range
                  caption="Incremento de la secante (Δx = h)"
                  symbol="h"
                  min={0.05}
                  max={1.2}
                  step={0.05}
                  value={h}
                  onChange={setH}
                />
              </>
            )}

            {level === 'universidad' && calcMode === 'integral' && (
              <>
                <Range
                  caption="Límite inferior de integración"
                  symbol="a"
                  min={-2.2}
                  max={0.5}
                  step={0.1}
                  value={intA}
                  onChange={setIntA}
                />
                <Range
                  caption="Límite superior de integración"
                  symbol="b"
                  min={-0.2}
                  max={2.2}
                  step={0.1}
                  value={intB}
                  onChange={setIntB}
                />
                <Range
                  caption="Número de rectángulos (particiones n)"
                  symbol="n"
                  min={2}
                  max={36}
                  step={2}
                  value={riemannN}
                  onChange={setRiemannN}
                />
                <div className="flex items-center justify-between rounded-xl border border-[#E8E1F3] bg-white px-3 py-2">
                  <span className="text-[11px] font-semibold text-[#625374]">Regla de muestreo</span>
                  <div className="flex gap-1">
                    {(
                      [
                        ['left', 'Izquierda'],
                        ['midpoint', 'Punto medio'],
                        ['right', 'Derecha'],
                      ] as const
                    ).map(([rId, rLabel]) => (
                      <button
                        key={rId}
                        type="button"
                        onClick={() => setRiemannRule(rId)}
                        className={
                          'rounded-md px-2 py-1 text-[10px] font-bold ' +
                          (riemannRule === rId
                            ? 'bg-[#6733C7] text-white'
                            : 'bg-[#F3ECFC] text-[#5B3E85]')
                        }
                      >
                        {rLabel}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {level === 'universidad' && calcMode === 'curva' && (
              <>
                <Range
                  caption="Abscisa de evaluación (x₀)"
                  symbol="x₀"
                  min={-2}
                  max={2}
                  step={0.1}
                  value={x0}
                  onChange={setX0}
                />
                <div className="rounded-xl border border-[#E8E1F3] bg-white p-3 text-xs text-[#59486B]">
                  <p className="font-bold text-[#3B2554]">Derivadas analíticas del modelo:</p>
                  <p className="mt-1 font-mono text-[11px] text-[#059669]">
                    {activeCalcFn.derivativeFormula}
                  </p>
                  <p className="mt-0.5 font-mono text-[11px] text-[#D9468F]">
                    {activeCalcFn.secondDerivativeFormula}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Analytical Readout Card */}
          <div className="mt-4 rounded-xl border border-[#E7DDF2] bg-[#F8F4FF] p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-[.14em] text-[#8B6EA7]">
                <Sigma className="size-3.5 text-[#753EE0]" /> Lectura matemática y propiedades
              </p>
              <Sparkles className="size-3.5 text-[#9D6CE0]" />
            </div>

            {level === 'secundaria' && (
              <>
                <p className="mt-2 break-words font-mono text-[13px] font-bold text-[#5C2EA7]">
                  {secundariaView.equation}
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[11px]">
                  <div className="rounded-lg border border-[#E6DAF3] bg-white px-2.5 py-1.5">
                    <span className="font-bold text-[#7A5BA1]">Dominio: </span>
                    <span className="font-mono text-[#38234C]">{secundariaView.domainStr}</span>
                  </div>
                  <div className="rounded-lg border border-[#E6DAF3] bg-white px-2.5 py-1.5">
                    <span className="font-bold text-[#7A5BA1]">Rango: </span>
                    <span className="font-mono text-[#38234C]">{secundariaView.rangeStr}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#574769]">{secundariaView.line1}</p>
                <p className="mt-1 text-xs leading-5 text-[#574769]">{secundariaView.line2}</p>
              </>
            )}

            {level === 'preuni' && (
              <>
                <p className="mt-2 break-words font-mono text-[13px] font-bold text-[#5C2EA7]">
                  {preuniView.equation}
                </p>
                <div className="mt-2.5 grid grid-cols-1 gap-1.5 text-[11px] sm:grid-cols-2">
                  <div className="rounded-lg border border-[#E6DAF3] bg-white px-2.5 py-1.5">
                    <span className="font-bold text-[#7A5BA1]">Dom: </span>
                    <span className="font-mono text-[#38234C]">{preuniView.domainStr}</span>
                  </div>
                  <div className="rounded-lg border border-[#E6DAF3] bg-white px-2.5 py-1.5">
                    <span className="font-bold text-[#7A5BA1]">Ran: </span>
                    <span className="font-mono text-[#38234C]">{preuniView.rangeStr}</span>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-5 text-[#574769]">{preuniView.line1}</p>
                <p className="mt-1 text-xs leading-5 text-[#574769]">{preuniView.line2}</p>
              </>
            )}

            {level === 'universidad' && calcMode === 'derivada' && (
              <>
                <p className="mt-2 font-mono text-[13px] font-bold text-[#5C2EA7]">
                  {activeCalcFn.formula} · ({activeCalcFn.derivativeFormula})
                </p>
                <p className="mt-2 text-xs leading-5 text-[#574769]">
                  Pendiente tangente f′({pretty(x0, 1)}) ={' '}
                  <strong className="text-[#C2410C]">{pretty(calculus.exact, 3)}</strong> ·
                  Pendiente secante ={' '}
                  <strong className="text-[#0F766E]">{pretty(calculus.approximate, 3)}</strong>
                </p>
                <p className="mt-1 text-xs leading-5 text-[#574769]">
                  Diferencial dy = {pretty(calculus.dy, 3)} vs. Δy = {pretty(calculus.deltaY, 3)} ·
                  Error |f′ − m_sec| = {pretty(Math.abs(calculus.exact - calculus.approximate), 3)}
                </p>
              </>
            )}

            {level === 'universidad' && calcMode === 'integral' && (
              <>
                <p className="mt-2 font-mono text-[13px] font-bold text-[#5C2EA7]">
                  ∫[{pretty(Math.min(intA, intB), 1)} → {pretty(Math.max(intA, intB), 1)}] ({activeCalcFn.label}) dx
                </p>
                <p className="mt-2 text-xs leading-5 text-[#574769]">
                  Suma de Riemann (n = {riemannN}, Δx = {pretty(riemann.dx, 2)}):{' '}
                  <strong className="text-[#5C2EA7]">{pretty(riemann.riemannSum, 4)}</strong>
                </p>
                <p className="mt-1 text-xs leading-5 text-[#574769]">
                  Integral exacta F(b) − F(a) ={' '}
                  <strong className="text-[#0F766E]">{pretty(riemann.exactIntegral, 4)}</strong> ·
                  Error = {pretty(riemann.error, 4)}
                </p>
              </>
            )}

            {level === 'universidad' && calcMode === 'curva' && (
              <>
                <p className="mt-2 font-mono text-[13px] font-bold text-[#5C2EA7]">
                  En x₀ = {pretty(x0, 1)}: f(x₀) = {pretty(calculus.y, 2)}
                </p>
                <p className="mt-2 text-xs leading-5 text-[#574769]">
                  1.ª Derivada f′({pretty(x0, 1)}) = {pretty(calculus.exact, 2)} →{' '}
                  <strong>
                    {Math.abs(calculus.exact) < 0.08
                      ? 'Punto estacionario (extremo local)'
                      : calculus.exact > 0
                        ? 'Función Creciente (↗)'
                        : 'Función Decreciente (↘)'}
                  </strong>
                </p>
                <p className="mt-1 text-xs leading-5 text-[#574769]">
                  2.ª Derivada f″({pretty(x0, 1)}) = {pretty(calculus.secondDeriv, 2)} →{' '}
                  <strong>
                    {Math.abs(calculus.secondDeriv) < 0.08
                      ? 'Punto de inflexión (f″ = 0)'
                      : calculus.secondDeriv > 0
                        ? 'Cóncava hacia arriba (∪)'
                        : 'Cóncava hacia abajo (∩)'}
                  </strong>
                </p>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Interactive SVG Graph + Footer Callout */}
        <div className="min-w-0">
          {level === 'secundaria' && (
            <MathGraph
              level={level}
              domain={secundariaView.domain}
              plot={secundariaView.plot}
              marker={secundariaView.marker}
              extraMarkers={secundariaView.extraMarkers}
              roots={secundariaView.roots}
              vAsymptotes={secundariaView.vAsymptotes}
              hAsymptotes={secundariaView.hAsymptotes}
              stepSegments={secundariaView.stepSegments}
              ariaDescription={`Gráfica interactiva de ${activeFamily.title}`}
            />
          )}

          {level === 'preuni' && (
            <MathGraph
              level={level}
              domain={preuniView.domain}
              plot={preuniView.plot}
              aux={preuniView.aux}
              auxLabel={preuniView.auxLabel}
              vAsymptotes={preuniView.vAsymptotes}
              hAsymptotes={preuniView.hAsymptotes}
              extraMarkers={preuniView.extraMarkers}
              yPiTicks={preuniView.yPiTicks}
              ariaDescription={`Gráfica interactiva trigonométrica: ${
                trigCategory === 'directas' ? activeDirectTrig.name : activeInverseTrig.name
              }`}
            />
          )}

          {level === 'universidad' && (
            <MathGraph
              level={level}
              domain={universidadView.domain}
              plot={universidadView.plot}
              aux={universidadView.aux}
              auxLabel={universidadView.auxLabel}
              secondaryAux={universidadView.secondaryAux}
              secondaryAuxLabel={universidadView.secondaryAuxLabel}
              tangent={universidadView.tangent}
              secant={universidadView.secant}
              marker={universidadView.marker}
              secondaryMarker={universidadView.secondaryMarker}
              extraMarkers={universidadView.extraMarkers}
              riemannRects={universidadView.riemannRects}
              diffTriangle={universidadView.diffTriangle}
              ariaDescription={`Gráfica interactiva de cálculo: ${activeCalcMode.title}`}
            />
          )}

          <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-[#E8DDF1] bg-[#FBF9FF] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-extrabold text-[#3C2A4E]">
                Demostración programada con rigor matemático y pedagógico.
              </p>
              <p className="mt-1 text-[11px] leading-5 text-[#7A6A87]">
                El taller de US$9 enseña el método paso a paso para construir y verificar tu primer
                módulo guiado; este laboratorio ilustra el estándar de detalle al que aspiramos en
                clase.
              </p>
            </div>
            <a
              href="#proyectos"
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#6D39C8] hover:underline"
            >
              Proyectos reales <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
