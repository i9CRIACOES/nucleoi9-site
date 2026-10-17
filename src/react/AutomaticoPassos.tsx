/**
 * O passo a passo da faixa "Venda todo dia, no automático": um Agente iA no
 * piloto automático cumprindo cada etapa, uma de cada vez. O cartão do agente
 * fica no topo com o interruptor ligado; abaixo, a trilha acende passo a passo
 * e cada um mostra o que saiu dele (o lead, a qualificação, a reunião no
 * Google Agenda, a explicação, o áudio). Roda em laço enquanto está na tela;
 * com menos movimento, mostra tudo aceso.
 */
import { CalendarCheck, Check, Filter, MessageCircle, MessageCircleQuestion, Mic, Users, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AUTOMATICO } from "../lib/conteudo";

const { agente, passos, fim } = AUTOMATICO;
const ICONES: Record<string, LucideIcon> = { MessageCircle, Filter, CalendarCheck, MessageCircleQuestion, Mic };

const INICIO = 600;
const CADA = 1900;
const TOTAL = passos.length + 1; // os passos e o fim
const CICLO = INICIO + CADA * TOTAL + 2600;

/** Quantos passos já acenderam no instante `t`. Puro, para o teste. */
export function acesosEm(t: number): number {
  if (t < INICIO) return 0;
  return Math.min(TOTAL, Math.floor((t - INICIO) / CADA) + 1);
}

function Onda() {
  return (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden="true">
      {Array.from({ length: 14 }, (_, i) => (
        <i key={i} className="w-[2px] origin-bottom rounded-full bg-current" style={{ height: `${4 + ((i * 5) % 10)}px`, animation: `autoOnda ${0.7 + (i % 4) * 0.12}s ease-in-out ${i * 0.05}s infinite` }} />
      ))}
    </span>
  );
}

export default function AutomaticoPassos() {
  const [menos] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [t, setT] = useState(menos ? CICLO - 1 : 0);
  const [visivel, setVisivel] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (menos || !visivel) return;
    const id = setInterval(() => setT((v) => (v + 100 >= CICLO ? 0 : v + 100)), 100);
    return () => clearInterval(id);
  }, [menos, visivel]);

  const acesos = acesosEm(t);
  const anim = !menos;
  const entra = anim ? "autoEntra .45s cubic-bezier(.2,.9,.3,1.2) both" : undefined;

  return (
    <div ref={raiz} className="w-full min-w-0 rounded-panel border border-white/15 bg-white/10 p-4 backdrop-blur-sm sm:p-5">
      {/* O agente que executa tudo, ligado no automático */}
      <div className="flex items-center gap-3 rounded-xl bg-white p-3 text-ink shadow-soft">
        <img src={agente.foto} alt={`Foto do agente ${agente.nome}`} width={44} height={44} loading="lazy" className="size-11 shrink-0 rounded-full object-cover" />
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-sm font-semibold text-navy">{agente.nome}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[11px]">
            <span className="rounded-full bg-success/15 px-2 py-0.5 font-semibold text-[#1f8f43]">Ligado</span>
            <span className="rounded-full bg-canvas px-2 py-0.5 font-medium text-muted">{agente.modo}</span>
            <span className="hidden text-muted sm:inline">· responde sozinho, 24 h</span>
          </p>
        </div>
        <span className="inline-flex h-6 w-11 shrink-0 items-center rounded-full bg-success p-0.5" role="img" aria-label="Agente iA ligado">
          <span className="ml-auto size-5 rounded-full bg-white shadow-card" />
        </span>
      </div>

      {/* A trilha */}
      <ol className="relative mt-4 flex flex-col gap-2.5" aria-label="O que o Agente iA faz no automático">
        {passos.map((p, i) => {
          const Icone = ICONES[p.icone] ?? MessageCircle;
          const aceso = i < acesos;
          const atual = i === acesos - 1 && acesos <= passos.length;
          const voz = p.icone === "Mic";
          return (
            <li key={p.titulo} className="relative flex gap-3">
              {/* linha vertical entre os passos */}
              <span aria-hidden="true" className="absolute left-[18px] top-10 h-[calc(100%-1.25rem)] w-0.5 rounded-full bg-white/20">
                <span className="block w-full rounded-full bg-success transition-[height] duration-700 ease-out" style={{ height: i < acesos - 1 ? "100%" : "0%" }} />
              </span>
              <span
                className={`relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  aceso ? "border-success bg-success text-navy" : "border-white/30 bg-white/10 text-white/60"
                } ${atual && anim ? "ring-4 ring-success/30" : ""}`}
                style={aceso && anim && atual ? { animation: "autoPop .4s cubic-bezier(.2,.9,.3,1.4) both" } : undefined}
              >
                <Icone className="size-4" aria-hidden="true" />
              </span>
              <div className={`min-w-0 flex-1 rounded-xl border px-3.5 py-2.5 transition-all duration-500 ${aceso ? "border-white/25 bg-white/15" : "border-white/10 bg-transparent opacity-60"}`}>
                <p className="flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="text-[11px] font-bold text-white/60">{i + 1}.</span>
                  {p.titulo}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white/80">{p.texto}</p>
                {aceso && (
                  <p className="mt-1.5 inline-flex max-w-full items-start gap-1.5 rounded-lg bg-white px-2 py-1 text-[11px] font-semibold leading-snug text-navy" style={{ animation: entra }}>
                    {voz ? <Onda /> : <Check className="mt-0.5 size-3 shrink-0 text-[#1f8f43]" strokeWidth={3} aria-hidden="true" />}
                    <span>{p.resultado}</span>
                  </p>
                )}
              </div>
            </li>
          );
        })}

        {/* O fim: a equipe entra */}
        <li className="relative flex gap-3">
          <span
            className={`relative z-10 mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
              acesos >= TOTAL ? "border-white bg-white text-brand" : "border-white/30 bg-white/10 text-white/60"
            }`}
            style={acesos >= TOTAL && anim ? { animation: "autoPop .4s cubic-bezier(.2,.9,.3,1.4) both" } : undefined}
          >
            <Users className="size-4" aria-hidden="true" />
          </span>
          <div className={`min-w-0 flex-1 rounded-xl px-3.5 py-2.5 transition-all duration-500 ${acesos >= TOTAL ? "bg-white text-navy shadow-soft" : "border border-dashed border-white/20 text-white/70"}`}>
            <p className="text-sm font-semibold">{fim.titulo}</p>
            <p className={`mt-0.5 text-[12.5px] leading-snug ${acesos >= TOTAL ? "text-muted" : "text-white/70"}`}>{fim.texto}</p>
          </div>
        </li>
      </ol>

      <style>{`
        @keyframes autoEntra { from { opacity: 0; transform: translateY(6px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes autoPop { from { transform: scale(.6) } to { transform: none } }
        @keyframes autoOnda { 0%,100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
      `}</style>
    </div>
  );
}
