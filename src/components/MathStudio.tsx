import { useId, useMemo, useState } from 'react';
import { ArrowUpRight, ChartNoAxesCombined, CircleDot, Compass, SlidersHorizontal } from 'lucide-react';

type Level = 'secundaria' | 'preuni' | 'universidad';
type Interval = { min: number; max: number };
type GraphDomain = { x: Interval; y: Interval };

const LEVELS: {id:Level;stage:string;label:string;topic:string;note:string}[] = [
  {id:'secundaria',stage:'4.º–5.º secundaria',label:'Funciones',topic:'Análisis de parábolas',note:'Raíces, vértice y discriminante, en tiempo real'},
  {id:'preuni',stage:'Academia preuniversitaria',label:'Trigonometría',topic:'Transformaciones trigonométricas',note:'Amplitud, frecuencia y desfase en una curva'},
  {id:'universidad',stage:'Nivel universitario',label:'Cálculo',topic:'Derivada y recta tangente',note:'Compara pendiente exacta y aproximación secante'},
];

export function quadraticFacts(a:number,b:number,c:number) {
  const discriminant=b*b-4*a*c;
  const vertexX=-b/(2*a),vertexY=a*vertexX*vertexX+b*vertexX+c;
  return {discriminant,vertexX,vertexY,roots:discriminant<0?[]:[(-b-Math.sqrt(discriminant))/(2*a),(-b+Math.sqrt(discriminant))/(2*a)]};
}
export function trigFacts(amplitude:number,frequency:number,phaseDegrees:number) {
  return {period:2*Math.PI/frequency,shift:-(phaseDegrees*Math.PI/180)/frequency,amplitude};
}
export function calculusFacts(x:number,h:number) {
  const f=(v:number)=>v*v*v-3*v;
  return {y:f(x),exact:3*x*x-3,approximate:(f(x+h)-f(x))/h,integral:x*x*x*x/4-3*x*x/2};
}
function pretty(n:number, precision=2) {
  if (!Number.isFinite(n)) return '—';
  if (Math.abs(n)<0.000001) return '0';
  return Number(n.toFixed(precision)).toLocaleString('es-PE',{maximumFractionDigits:precision});
}
function Range({symbol,caption,min,max,step,value,onChange}:{
  symbol:string;caption:string;min:number;max:number;step:number;value:number;onChange:(n:number)=>void
}) {
  return <label className="block rounded-2xl border border-[#E8E1F3] bg-white p-3.5">
    <span className="mb-2 flex items-center justify-between gap-2">
      <span className="text-[11px] font-semibold text-[#625374]">{caption}</span>
      <span className="rounded-md bg-[#F1E9FF] px-2 py-1 font-mono text-xs font-bold text-[#6733C7]">{symbol} = {pretty(value,2)}</span>
    </span>
    <input aria-label={caption} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.currentTarget.value))}
      className="w-full cursor-pointer accent-[#7540DF]"/>
  </label>;
}
function MathGraph({level,domain,plot,aux,tangent,marker,roots}:{
  level:Level;domain:GraphDomain;plot:(x:number)=>number;aux?:(x:number)=>number;tangent?:(x:number)=>number;
  marker?:{x:number;y:number;label:string};roots?:number[]
}) {
  const clipId='graph-'+useId().replace(/:/g,'');
  const {x,y}=domain;
  const left=48,right=650,top=22,bottom=307;
  const sx=(v:number)=>left+(v-x.min)/(x.max-x.min)*(right-left);
  const sy=(v:number)=>bottom-(v-y.min)/(y.max-y.min)*(bottom-top);
  const build=(fn:(x:number)=>number)=>{
    const parts:string[]=[];
    for(let i=0;i<=240;i++){
      const vx=x.min+(x.max-x.min)*i/240;
      const vy=fn(vx);
      if(!Number.isFinite(vy)){continue;}
      parts.push((parts.length?'L':'M')+sx(vx).toFixed(2)+','+sy(vy).toFixed(2));
    }
    return parts.join(' ');
  };
  const xTicks=level==='preuni'?[-2*Math.PI,-Math.PI,0,Math.PI,2*Math.PI]:[-4,-3,-2,-1,0,1,2,3,4].filter(v=>v>=x.min&&v<=x.max);
  const yTicks=level==='preuni'?[-2,-1,0,1,2]:[-6,-3,0,3,6];
  const xLabel=(v:number)=>level!=='preuni'?String(v):(v===0?'0':v===Math.PI?'π':v===-Math.PI?'−π':v===2*Math.PI?'2π':'−2π');
  return <div className="overflow-hidden rounded-[22px] border border-[#E6DDEC] bg-white">
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F0E7F6] px-4 py-3">
      <span className="inline-flex items-center gap-2 text-[11px] font-bold text-[#5C4C71]"><CircleDot className="size-3.5 text-[#8B50E7]"/> PLANO DINÁMICO</span>
      <span className="font-mono text-[10px] text-[#887B93]">Parámetros vinculados · actualización en vivo</span>
    </div>
    <svg viewBox="0 0 680 345" role="img" aria-label={'Gráfica interactiva de '+(level==='secundaria'?'una función cuadrática':level==='preuni'?'una función seno':'un polinomio cúbico y su recta tangente')} className="block w-full select-none bg-[#FEFCFF]">
      <defs><clipPath id={clipId}><rect x={left} y={top} width={right-left} height={bottom-top}/></clipPath></defs>
      {xTicks.map(v=><g key={'x'+v}><line x1={sx(v)} x2={sx(v)} y1={top} y2={bottom} stroke="#EFE8F6"/><text x={sx(v)} y={331} textAnchor="middle" fill="#9A8BA9" fontSize="11">{xLabel(v)}</text></g>)}
      {yTicks.map(v=><g key={'y'+v}><line x1={left} x2={right} y1={sy(v)} y2={sy(v)} stroke="#EFE8F6"/><text x={37} y={sy(v)+4} textAnchor="end" fill="#9A8BA9" fontSize="11">{v}</text></g>)}
      <path d={'M'+sx(0)+','+top+' V'+bottom+' M'+left+','+sy(0)+' H'+right} stroke="#B8A7C9" strokeWidth="1.5"/>
      <g clipPath={'url(#'+clipId+')'}>
        {aux&&<path d={build(aux)} stroke="#E4A0B6" strokeDasharray="7 5" strokeWidth="2.5" fill="none"/>}
        <path d={build(plot)} stroke="#7943E6" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        {tangent&&<path d={build(tangent)} stroke="#F07856" strokeWidth="2.5" strokeDasharray="7 5" fill="none"/>}
        {roots?.filter(v=>v>=x.min&&v<=x.max).map((v,i)=><circle key={'root'+i} cx={sx(v)} cy={sy(0)} r="5.5" stroke="#7742DB" strokeWidth="2.5" fill="white"/>)}
        {marker&&<><line x1={sx(marker.x)} x2={sx(marker.x)} y1={sy(0)} y2={sy(marker.y)} stroke="#BFA8E6" strokeDasharray="4 5"/><circle cx={sx(marker.x)} cy={sy(marker.y)} r="6" stroke="white" strokeWidth="2.5" fill="#F07856"/></>}
      </g>
      <text x={right-4} y={sy(0)-9} fill="#9482A7" fontSize="11" textAnchor="end">x</text>
      <text x={sx(0)+10} y={top+12} fill="#9482A7" fontSize="11">y</text>
    </svg>
    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#F0E7F6] px-4 py-3 text-[10px] font-semibold text-[#7D6E8B]">
      <span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 rounded bg-[#7943E6]"/>Función</span>
      {aux&&<span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 rounded border-t-2 border-dashed border-[#E4A0B6]"/>Referencia</span>}
      {tangent&&<span className="inline-flex items-center gap-2"><i className="h-0.5 w-5 rounded border-t-2 border-dashed border-[#F07856]"/>Tangente</span>}
      <span>Representación 2D · no usa una imagen estática</span>
    </div>
  </div>;
}

export default function MathStudio(){
  const [level,setLevel]=useState<Level>('secundaria');
  const [a,setA]=useState(1);
  const [b,setB]=useState(-2);
  const [c,setC]=useState(-3);
  const [amplitude,setAmplitude]=useState(1.5);
  const [frequency,setFrequency]=useState(2);
  const [phase,setPhase]=useState(0);
  const [x0,setX0]=useState(0.8);
  const [h,setH]=useState(0.5);
  const facts=useMemo(()=>quadraticFacts(a,b,c),[a,b,c]);
  const trig=useMemo(()=>trigFacts(amplitude,frequency,phase),[amplitude,frequency,phase]);
  const calculus=useMemo(()=>calculusFacts(x0,h),[x0,h]);
  const selected=LEVELS.find(s=>s.id===level)!;
  const modeFunction=level==='secundaria'?(x:number)=>a*x*x+b*x+c:level==='preuni'?(x:number)=>amplitude*Math.sin(frequency*x+phase*Math.PI/180):(x:number)=>x*x*x-3*x;
  const domain=level==='secundaria'?{x:{min:-4.5,max:4.5},y:{min:-10,max:10}}:
    level==='preuni'?{x:{min:-2*Math.PI,max:2*Math.PI},y:{min:-3,max:3}}:
    {x:{min:-2.5,max:2.5},y:{min:-9,max:9}};
  const marker=level==='secundaria'?{x:facts.vertexX,y:facts.vertexY,label:'V'}:
    level==='universidad'?{x:x0,y:calculus.y,label:'P'}:undefined;
  const reset=()=>{
    setA(1);setB(-2);setC(-3);setAmplitude(1.5);setFrequency(2);setPhase(0);setX0(0.8);setH(0.5);
  };
  return <section aria-label="Laboratorio de matemáticas interactivo" className="overflow-hidden rounded-[28px] border border-[#DFD1ED] bg-white shadow-[0_28px_100px_rgba(55,25,110,0.13)]">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#EADFF5] bg-gradient-to-r from-[#F8F2FF] to-[#FFF8FB] px-5 py-4 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl bg-[#6736D7] text-white"><ChartNoAxesCombined className="size-5"/></span>
        <div><p className="font-display text-sm font-bold tracking-[-.02em] text-[#27173F]">MATH STUDIO <span className="text-[#8358C5]">/ LIVE</span></p><p className="mt-0.5 text-[10px] text-[#897C98]">Mueve los controles. Observa cómo cambia el modelo.</p></div>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D9C9EC] bg-white/80 px-3 py-1.5 text-[10px] font-bold text-[#7352A9]"><span className="size-1.5 rounded-full bg-[#27B58A]"/> 3 niveles académicos</span>
    </div>
    <div role="tablist" aria-label="Elegir nivel académico" className="grid grid-cols-3 gap-1.5 bg-[#F8F5FD] p-2 sm:gap-2.5 sm:p-3">
      {LEVELS.map(item=><button key={item.id} role="tab" type="button" aria-selected={level===item.id} onClick={()=>setLevel(item.id)}
        className={'min-w-0 rounded-xl border px-2 py-3 text-left transition sm:px-4 '+(level===item.id?'border-[#C8B0EB] bg-white shadow-[0_4px_18px_rgba(86,42,128,.08)]':'border-transparent bg-transparent hover:bg-white/70')}>
        <span className={'block text-[10px] font-bold leading-4 sm:text-xs '+(level===item.id?'text-[#6E39CE]':'text-[#897B96]')}>{item.stage}</span>
        <span className="mt-0.5 block text-[11px] font-extrabold text-[#3C2A4B] sm:text-sm">{item.label}</span>
      </button>)}
    </div>
    <div className="grid gap-5 p-4 sm:p-6 lg:grid-cols-[.72fr_1.28fr] lg:gap-6">
      <div className="flex flex-col">
        <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[.13em] text-[#976DCE]"><Compass className="size-3.5"/> Módulo de exploración</span>
        <h3 className="font-display text-xl font-bold leading-tight text-[#2F1A4C] sm:text-2xl">{selected.topic}</h3>
        <p className="mt-2 text-xs leading-5 text-[#7A6B88]">{selected.note}</p>
        <div className="mt-5 flex items-center justify-between gap-2"><span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5A496B]"><SlidersHorizontal className="size-4 text-[#8350D8]"/> Parámetros</span><button type="button" onClick={reset} className="text-[11px] font-bold text-[#7445BD] hover:underline">Reiniciar</button></div>
        <div className="mt-2 grid gap-2">
          {level==='secundaria'&&<>
            <Range caption="Coeficiente cuadrático" symbol="a" min={0.5} max={2.5} step={0.5} value={a} onChange={setA}/>
            <Range caption="Coeficiente lineal" symbol="b" min={-4} max={4} step={1} value={b} onChange={setB}/>
            <Range caption="Término independiente" symbol="c" min={-4} max={4} step={1} value={c} onChange={setC}/>
          </>}
          {level==='preuni'&&<>
            <Range caption="Amplitud" symbol="A" min={0.5} max={2.5} step={0.5} value={amplitude} onChange={setAmplitude}/>
            <Range caption="Frecuencia angular" symbol="k" min={1} max={3} step={1} value={frequency} onChange={setFrequency}/>
            <Range caption="Fase (grados)" symbol="φ°" min={-180} max={180} step={45} value={phase} onChange={setPhase}/>
          </>}
          {level==='universidad'&&<>
            <Range caption="Punto de tangencia" symbol="x₀" min={-1.5} max={1.5} step={0.1} value={x0} onChange={setX0}/>
            <Range caption="Incremento de la secante" symbol="h" min={0.1} max={0.8} step={0.1} value={h} onChange={setH}/>
          </>}
        </div>
        <div className="mt-4 rounded-xl border border-[#E7DDF2] bg-[#F8F4FF] p-4">
          <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#8B6EA7]">Lectura matemática</p>
          {level==='secundaria'&&<>
            <p className="mt-2 break-words font-mono text-[13px] font-bold text-[#5C2EA7]">f(x) = {pretty(a)}x² {b>=0?'+':'−'} {pretty(Math.abs(b))}x {c>=0?'+':'−'} {pretty(Math.abs(c))}</p>
            <p className="mt-2 text-xs leading-6 text-[#574769]">Vértice ({pretty(facts.vertexX)}; {pretty(facts.vertexY)}) · Δ = {pretty(facts.discriminant)}</p>
            <p className="text-xs leading-6 text-[#574769]">{facts.discriminant<0?'Sin raíces reales':facts.discriminant===0?'Raíz doble: '+pretty(facts.roots[0]):'Raíces: '+pretty(facts.roots[0])+' y '+pretty(facts.roots[1])}</p>
          </>}
          {level==='preuni'&&<>
            <p className="mt-2 break-words font-mono text-[13px] font-bold text-[#5C2EA7]">y = {pretty(amplitude)} sen({pretty(frequency)}x {phase>=0?'+':'−'} {Math.abs(phase)}°)</p>
            <p className="mt-2 text-xs leading-6 text-[#574769]">Amplitud: {pretty(trig.amplitude)} · Período: {pretty(trig.period)} rad</p>
            <p className="text-xs leading-6 text-[#574769]">Desplazamiento horizontal: {pretty(trig.shift)} rad</p>
          </>}
          {level==='universidad'&&<>
            <p className="mt-2 font-mono text-[13px] font-bold text-[#5C2EA7]">f(x) = x³ − 3x</p>
            <p className="mt-2 text-xs leading-6 text-[#574769]">f′({pretty(x0,1)}) = {pretty(calculus.exact)} · Secante = {pretty(calculus.approximate)}</p>
            <p className="text-xs leading-6 text-[#574769]">Diferencia de pendientes: {pretty(Math.abs(calculus.exact-calculus.approximate),3)}</p>
          </>}
        </div>
      </div>
      <div className="min-w-0">
        <MathGraph level={level} domain={domain} plot={modeFunction}
          aux={level==='preuni'?(x:number)=>Math.sin(x):undefined}
          tangent={level==='universidad'?(x:number)=>calculus.y+calculus.exact*(x-x0):undefined}
          marker={marker} roots={level==='secundaria'?facts.roots:undefined}/>
        <div className="mt-4 flex flex-col gap-3 rounded-[18px] border border-[#E8DDF1] bg-[#FBF9FF] p-4 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-xs font-extrabold text-[#3C2A4E]">Esto es una demostración programada y operativa.</p><p className="mt-1 text-[11px] leading-5 text-[#7A6A87]">El taller de US$9 enseña el método para construir un primer módulo guiado; los tres módulos del escaparate no están incluidos como plataforma completa.</p></div>
          <a href="#proyectos" className="inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#6D39C8] hover:underline">Proyectos reales <ArrowUpRight className="size-4"/></a>
        </div>
      </div>
    </div>
  </section>;
}
