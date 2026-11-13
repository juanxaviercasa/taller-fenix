import { useId, useState } from 'react';
import { Activity, Compass, MoveUpRight } from 'lucide-react';
import { parabolaFacts, trigPeriod, vectorComponents } from '../math/previewFacts';

type Mode = 'conicas' | 'trigonometria' | 'vectores';
type Control = { label: string; value: number; min: number; max: number; step: number; set: (value: number) => void };

function graphPath(fn: (x: number) => number, xMin: number, xMax: number, samples: number, xPixel: (x: number) => number, yPixel: (y: number) => number) {
  return Array.from({ length: samples + 1 }, (_, i) => {
    const x = xMin + (xMax - xMin) * i / samples;
    return (i === 0 ? 'M' : 'L') + xPixel(x).toFixed(2) + ' ' + yPixel(fn(x)).toFixed(2);
  }).join(' ');
}

export default function HeroMathPreview() {
  const [mode, setMode] = useState<Mode>('conicas');
  const [a, setA] = useState(1);
  const [h, setH] = useState(0);
  const [amplitude, setAmplitude] = useState(1.5);
  const [frequency, setFrequency] = useState(1);
  const [force, setForce] = useState(4);
  const [degrees, setDegrees] = useState(35);
  const svgId = useId().replace(/:/g, '');
  const modes: { id: Mode; label: string }[] = [
    { id: 'conicas', label: 'Cónicas' },
    { id: 'trigonometria', label: 'Trigonometría' },
    { id: 'vectores', label: 'Vectores' },
  ];
  const controls: Control[] = mode === 'conicas'
    ? [{ label: 'Apertura (a)', value: a, min: 0.5, max: 2.5, step: 0.25, set: setA },
       { label: 'Desplazamiento (h)', value: h, min: -2.5, max: 2.5, step: 0.5, set: setH }]
    : mode === 'trigonometria'
    ? [{ label: 'Amplitud (A)', value: amplitude, min: 0.5, max: 2.5, step: 0.25, set: setAmplitude },
       { label: 'Frecuencia (k)', value: frequency, min: 0.5, max: 2.5, step: 0.25, set: setFrequency }]
    : [{ label: 'Magnitud (F)', value: force, min: 1, max: 6, step: 0.5, set: setForce },
       { label: 'Ángulo (°)', value: degrees, min: 0, max: 90, step: 5, set: setDegrees }];
  const xCoord = (x: number) => 360 + x * 62;
  const yCoord = (y: number) => 288 - y * 28;
  const parabola = graphPath(x => a * (x - h) ** 2 - 2, -5, 5, 180, xCoord, yCoord);
  const { focusY: focus, directrixY: directrix } = parabolaFacts(a, -2);
  const trigX = (x: number) => 360 + x / Math.PI * 52;
  const trigY = (y: number) => 230 - y * 75;
  const wave = graphPath(x => amplitude * Math.sin(frequency * x), -2 * Math.PI, 2 * Math.PI, 180, trigX, trigY);
  const { x: componentX, y: componentY } = vectorComponents(force, degrees);
  const vectorX = (x: number) => 115 + x * 78;
  const vectorY = (y: number) => 385 - y * 55;
  const format = (n: number) => Number(n.toFixed(2)).toString();
  const formula = mode === 'conicas'
    ? 'y = ' + format(a) + (h === 0 ? 'x²' : '(x ' + (h > 0 ? '− ' : '+ ') + format(Math.abs(h)) + ')²') + ' − 2'
    : mode === 'trigonometria'
    ? 'y = ' + format(amplitude) + ' sen(' + format(frequency) + 'x)'
    : 'Fx = ' + format(componentX) + '  ·  Fy = ' + format(componentY);
  const explanation = mode === 'conicas'
    ? 'Vértice: (' + format(h) + '; −2). Foco y directriz calculados desde a.'
    : mode === 'trigonometria'
    ? 'Período: ' + format(trigPeriod(frequency)) + ' rad. Los cambios son continuos.'
    : 'Componentes de una fuerza de ' + format(force) + ' unidades a ' + degrees + '°.';

  return (
    <div className="overflow-hidden rounded-[26px] border border-[#26344E] bg-[#101A2E] text-white shadow-[0_30px_75px_rgba(17,27,46,.18)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 text-sm font-semibold"><span className="flex size-7 items-center justify-center rounded-lg bg-emerald-300/15 text-[#A5E8C1]"><Activity size={16}/></span>Math Studio <span className="rounded-full bg-[#164B3F] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B9F2CF]">Live</span></div>
        <span className="text-[11px] text-slate-300">React + SVG · Cálculo en tiempo real</span>
      </div>
      <div className="px-4 pt-4 sm:px-5">
        <div role="tablist" aria-label="Selecciona un laboratorio matemático" className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1">
          {modes.map(item => (
            <button key={item.id} role="tab" aria-selected={mode === item.id} type="button" onClick={() => setMode(item.id)}
              className={'rounded-lg px-1 py-2 text-[11px] font-semibold transition sm:text-xs ' + (mode === item.id ? 'bg-[#D3F5E1] text-[#123B2D] shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white')}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="relative mt-4 overflow-hidden rounded-xl border border-[#34445B] bg-[#141F34]">
          <div className="absolute left-3 top-3 z-10 max-w-[80%] rounded-md bg-[#141F34]/95 px-2 py-1 font-mono text-xs font-semibold text-[#D1F9DB]">{formula}</div>
          <svg viewBox="0 0 720 440" role="img" aria-label={'Gráfico matemático interactivo: ' + explanation} className="h-auto w-full">
            <defs><clipPath id={svgId + '-plot'}><rect width="700" height="420" x="10" y="10" rx="6"/></clipPath><marker id={svgId + '-arrow'} markerWidth="9" markerHeight="9" refX="7" refY="3" orient="auto"><path d="M0 0 L7 3 L0 6" fill="none" stroke="#B2F7C9" strokeWidth="1.6"/></marker></defs>
            {Array.from({length: 12}, (_, i) => <line key={'v'+i} x1={60+i*55} x2={60+i*55} y1="18" y2="425" stroke="#2D3A4E" strokeWidth="1"/>)}
            {Array.from({length: 8}, (_, i) => <line key={'h'+i} x1="15" x2="705" y1={45+i*53} y2={45+i*53} stroke="#2D3A4E" strokeWidth="1"/>)}
            {mode === 'conicas' && <>
              <line x1={xCoord(0)} x2={xCoord(0)} y1="10" y2="430" stroke="#708097" strokeWidth="1.5"/>
              <line x1="15" x2="705" y1={yCoord(0)} y2={yCoord(0)} stroke="#708097" strokeWidth="1.5"/>
              <g clipPath={'url(#' + svgId + '-plot)'}><line x1="10" x2="710" y1={yCoord(directrix)} y2={yCoord(directrix)} stroke="#FDBA74" strokeDasharray="8 6" strokeWidth="2"/><path d={parabola} fill="none" stroke="#9FE3B8" strokeWidth="4" strokeLinecap="round"/></g>
              <circle cx={xCoord(h)} cy={yCoord(-2)} r="6" fill="#FFFFFF"/><circle cx={xCoord(h)} cy={yCoord(focus)} r="5" fill="#FDBA74"/>
              <text x="22" y={yCoord(directrix)-8} fill="#FDBA74" fontSize="15">Directriz</text>
              <text x={xCoord(h)+12} y={yCoord(focus)-7} fill="#FDBA74" fontSize="16">Foco</text>
              <text x="677" y={yCoord(0)-10} fill="#CBD5E1" fontSize="16">x</text><text x={xCoord(0)+10} y="27" fill="#CBD5E1" fontSize="16">y</text>
            </>}
            {mode === 'trigonometria' && <>
              <line x1="360" x2="360" y1="12" y2="428" stroke="#708097" strokeWidth="1.5"/><line x1="10" x2="710" y1="230" y2="230" stroke="#708097" strokeWidth="1.5"/>
              <path d={wave} stroke="#9FE3B8" strokeWidth="4" strokeLinecap="round" fill="none" clipPath={'url(#' + svgId + '-plot)'}/>
              <text x="38" y="246" fontSize="16" fill="#CBD5E1">−2π</text><text x="665" y="246" fontSize="16" fill="#CBD5E1">2π</text><text x="372" y="27" fontSize="16" fill="#CBD5E1">y</text>
            </>}
            {mode === 'vectores' && <>
              <line x1="115" x2="690" y1="385" y2="385" stroke="#708097" strokeWidth="1.5"/><line x1="115" x2="115" y1="412" y2="15" stroke="#708097" strokeWidth="1.5"/>
              <line x1={vectorX(componentX)} x2={vectorX(componentX)} y1={vectorY(0)} y2={vectorY(componentY)} stroke="#FBBF72" strokeDasharray="6 6" strokeWidth="2.5"/>
              <line x1={vectorX(0)} x2={vectorX(componentX)} y1={vectorY(0)} y2={vectorY(0)} stroke="#FBBF72" strokeWidth="3"/>
              <line x1={vectorX(0)} x2={vectorX(componentX)} y1={vectorY(0)} y2={vectorY(componentY)} stroke="#B2F7C9" strokeWidth="5" markerEnd={'url(#'+svgId+'-arrow)'}/>
              <circle cx={vectorX(componentX)} cy={vectorY(componentY)} r="5" fill="#B2F7C9"/>
              <text x="685" y="407" fill="#CBD5E1" fontSize="16">x</text><text x="94" y="27" fill="#CBD5E1" fontSize="16">y</text>
              <text x="140" y="355" fill="#FBBF72" fontSize="16">θ = {degrees}°</text>
            </>}
          </svg>
        </div>
        <p className="mt-3 min-h-9 text-xs leading-5 text-[#CBD5E1]" aria-live="polite">{explanation}</p>
        <div className="grid gap-4 py-4 sm:grid-cols-2">
          {controls.map(control => <label key={control.label} className="block">
            <span className="flex items-center justify-between gap-2 text-xs text-[#DFE7F1]"><span>{control.label}</span><output className="font-mono font-bold text-[#B2F7C9]">{format(control.value)}</output></span>
            <input type="range" min={control.min} max={control.max} step={control.step} value={control.value} onChange={e => control.set(Number(e.currentTarget.value))}
              className="mt-2 w-full cursor-pointer accent-[#A5E8C1]"/>
          </label>)}
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 border-t border-white/10 bg-white/[.035] px-4 py-3 text-[11px] text-slate-300 sm:px-5">
        <span className="inline-flex items-center gap-1"><Compass size={14}/> Desliza para comprobar el resultado</span>
        <span className="inline-flex items-center gap-1 text-[#A8E7BF]"><MoveUpRight size={14}/> Demostración real</span>
      </div>
    </div>
  );
}