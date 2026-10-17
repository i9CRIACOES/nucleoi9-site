/**
 * "Configure um agente em minutos", encenado como no painel do cliente: a
 * lista de Agentes iA com foto e chips, e a ficha da Isa completando os 9
 * passos (Montar · Treinar · Publicar), publicando a v3 e subindo os degraus
 * de ativação (Rascunho, Testando com a equipe, Copiloto, Ligado). A lista
 * acompanha a mudança. Roda só na tela; com menos movimento, mostra o fim.
 */
import { Check, ChevronRight, EllipsisVertical, Rocket } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AGENTES } from "../lib/conteudo";

const { agentes, passos, degraus } = AGENTES.montar;

/** Marcos da encenação, em ms. */
const PASSO_INICIO = 700;
const PASSO_CADA = 520;
const PUBLICA = PASSO_INICIO + PASSO_CADA * 9 + 500;
const DEGRAU_EM = [PUBLICA + 700, PUBLICA + 3100, PUBLICA + 5500];
const CICLO = PUBLICA + 10500;

/** Estado da Isa num instante `t` da encenação. Puro, para o teste. */
export function estadoEm(t: number) {
  const feitos = Math.max(0, Math.min(9, Math.floor((t - PASSO_INICIO) / PASSO_CADA) + 1));
  const publicado = t >= PUBLICA;
  const degrau = DEGRAU_EM.filter((d) => t >= d).length;
  const modo = ["Copiloto", "Lista de teste", "Copiloto", "Piloto automático"][degrau];
  const chips = [degrau > 0 ? "Ligado" : "Rascunho", modo, publicado ? "v3" : "v2", "Suporte"];
  return { feitos, publicado, degrau, chips };
}

const FIM = CICLO - 1;

function Chip({ texto, novo }: { texto: string; novo?: boolean }) {
  const cor =
    texto === "Ligado"
      ? "bg-success/15 text-[#1f8f43]"
      : texto === "Alterações não publicadas"
        ? "bg-amber-100 text-amber-800"
        : "bg-canvas text-muted";
  return (
    <span
      key={texto}
      className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${cor}`}
      style={novo ? { animation: "montChip .45s cubic-bezier(.2,.9,.3,1.3) both" } : undefined}
    >
      {texto}
    </span>
  );
}

function Foto({ src, nome, tam = "size-11" }: { src: string; nome: string; tam?: string }) {
  return <img src={src} alt={`Foto do agente ${nome}`} width={44} height={44} loading="lazy" className={`${tam} shrink-0 rounded-full object-cover`} />;
}

export default function MontarAgente() {
  const [menos] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [t, setT] = useState(menos ? FIM : 0);
  const [visivel, setVisivel] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (menos || !visivel) return;
    const id = setInterval(() => setT((v) => (v + 100 >= CICLO ? 0 : v + 100)), 100);
    return () => clearInterval(id);
  }, [menos, visivel]);

  const { feitos, publicado, degrau, chips } = estadoEm(t);
  const anim = !menos;
  const isa = agentes.find((a) => a.nome.startsWith("Isa"))!;
  const grupos = [...new Set(agentes.map((a) => a.grupo))];
  const fases = [
    { nome: "Montar", de: 0, ate: 7 },
    { nome: "Treinar", de: 7, ate: 8 },
    { nome: "Publicar", de: 8, ate: 9 },
  ];

  return (
    <div ref={raiz} className="flex w-full min-w-0 flex-col gap-4">
      {/* Lista de Agentes iA, como no painel */}
      <div className="overflow-hidden rounded-panel border border-line bg-white shadow-soft">
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-3">
          <div>
            <p className="font-semibold text-navy">Agentes iA</p>
            <p className="text-[11px] text-muted">Atendem primeiro no WhatsApp; a equipe acompanha e assume quando quiser.</p>
          </div>
          <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">Módulo</span>
        </div>
        <div className="flex flex-col gap-1 p-4 pt-2">
          {grupos.map((g) => (
            <div key={g}>
              <p className="px-1 pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-wide text-muted">{g}</p>
              <ul className="flex flex-col gap-2">
                {agentes
                  .filter((a) => a.grupo === g)
                  .map((a) => {
                    const ehIsa = a === isa;
                    const lista = ehIsa ? chips : a.chips;
                    return (
                      <li
                        key={a.nome}
                        className={`flex items-center gap-3 rounded-xl border p-2.5 transition-colors duration-500 ${ehIsa && degrau > 0 ? "border-success/60 bg-success/5" : "border-line"}`}
                      >
                        <Foto src={a.foto} nome={a.nome} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-navy">{a.nome}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {lista.map((c) => (
                              <Chip key={c} texto={c} novo={anim && ehIsa && t > 0} />
                            ))}
                          </div>
                        </div>
                        <EllipsisVertical className="size-4 shrink-0 text-muted" aria-hidden="true" />
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Ficha da Isa: 9 passos, publicar, degraus */}
      <div className="overflow-hidden rounded-panel border border-line bg-white shadow-soft">
        <div className="flex flex-wrap items-center gap-3 border-b border-line px-5 py-3">
          <Foto src={isa.foto} nome={isa.nome} tam="size-12" />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-navy">{isa.nome}</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {chips.map((c) => (
                <Chip key={c} texto={c} novo={anim && t > 0} />
              ))}
            </div>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="h-1.5 w-36 overflow-hidden rounded-full bg-line sm:w-48">
                <span className="block h-full rounded-full bg-success transition-[width] duration-500 ease-out" style={{ width: `${(feitos / 9) * 100}%` }} />
              </span>
              <span className="text-[11px] tabular-nums text-muted">{feitos} de 9 passos</span>
            </div>
          </div>
          <span
            className={`inline-flex h-8 w-full shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 sm:w-auto text-xs font-semibold text-white transition-colors ${publicado ? "bg-success" : feitos === 9 ? "bg-navy" : "bg-navy/40"}`}
            style={anim && feitos === 9 && !publicado ? { animation: "montPulso 1s ease-out infinite" } : undefined}
          >
            {publicado ? <Check className="size-3.5" strokeWidth={3} aria-hidden="true" /> : <Rocket className="size-3.5" aria-hidden="true" />}
            {publicado ? "v3 publicada" : "Publicar"}
          </span>
        </div>

        <div className="overflow-x-auto px-3 pb-2 pt-3 [scrollbar-width:thin]">
          <div className="flex min-w-[600px] rounded-lg border border-line px-1.5 pb-1 pt-2">
            {fases.map((f, iFase) => {
              const prontas = Math.max(0, Math.min(feitos, f.ate) - f.de);
              const total = f.ate - f.de;
              return (
                <div key={f.nome} className="min-w-0" style={{ flexGrow: total, minWidth: total === 1 ? 118 : undefined }}>
                  <p className="flex items-baseline gap-1.5 whitespace-nowrap px-1 text-[11px]">
                    <span className="font-semibold text-navy">{f.nome}</span>
                    <span className="tabular-nums text-muted">
                      {prontas} de {total} {prontas === 1 ? "pronta" : "prontas"}
                    </span>
                  </p>
                  <div className="flex">
                    {passos.slice(f.de, f.ate).map((p, k) => {
                      const i = f.de + k;
                      const feito = i < feitos;
                      const ativo = i === feitos && feitos < 9;
                                            const primeira = iFase === 0 && k === 0;
                      const ultima = i === 8;
                      return (
                        <div key={p.nome} className="flex min-w-0 flex-1 flex-col items-center gap-1 py-1.5">
                          <span className="flex w-full items-center">
                            <span className={`h-0.5 flex-1 transition-colors duration-500 ${primeira ? "bg-transparent" : feito ? "bg-success" : "bg-line"}`} />
                            <span
                              className={`flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-semibold transition-colors duration-300 ${
                                feito ? "border-success bg-success text-white" : ativo ? "border-brand bg-brand text-white ring-2 ring-brand ring-offset-2" : "border-line bg-white text-muted"
                              }`}
                              style={anim && feito && i === feitos - 1 ? { animation: "montChip .4s cubic-bezier(.2,.9,.3,1.4) both" } : undefined}
                            >
                              {feito ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : i + 1}
                            </span>
                            <span className={`h-0.5 flex-1 transition-colors duration-500 ${ultima ? "bg-transparent" : feito ? "bg-success" : "bg-line"}`} />
                          </span>
                          <span className={`flex max-w-full items-center gap-1 truncate text-[10.5px] leading-tight ${ativo ? "font-semibold text-navy" : "text-muted"}`}>
                                                        <span className="truncate" title={p.nome}>{p.nome}</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-line bg-canvas/60 px-4 py-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-muted">Caminho até o automático</p>
          <ol className="grid grid-cols-2 gap-1.5 sm:flex sm:items-stretch">
            {degraus.map((d, i) => {
              const atual = i === degrau;
              const passou = i < degrau;
              return (
                <li key={d.nome} className="flex min-w-0 items-center gap-1.5 sm:flex-1">
                  <span
                    className={`flex min-w-0 flex-1 flex-col rounded-lg border px-2.5 py-1.5 transition-all duration-500 ${
                      atual
                        ? i === 3
                          ? "border-success bg-success text-white shadow-card"
                          : "border-brand bg-brand text-white shadow-card"
                        : passou
                          ? "border-success/40 bg-white text-[#1f8f43]"
                          : "border-line bg-white text-muted"
                    }`}
                  >
                    <span className="flex items-center gap-1 text-[11px] font-semibold">
                      {passou && <Check className="size-3 shrink-0" strokeWidth={3} aria-hidden="true" />}
                      <span className="truncate">{d.nome}</span>
                    </span>
                  </span>
                  {i < degraus.length - 1 && <ChevronRight className="hidden size-3.5 shrink-0 text-muted sm:block" aria-hidden="true" />}
                </li>
              );
            })}
          </ol>
          <p key={degrau} className="mt-2 text-[11.5px] text-ink" style={anim ? { animation: "montChip .4s ease-out both" } : undefined} aria-live="polite">
            <span className="font-semibold text-navy">{degraus[degrau].nome}:</span> {degraus[degrau].texto}
          </p>
        </div>
      </div>

      <style>{`
        @keyframes montChip { from { opacity: 0; transform: scale(.7) } to { opacity: 1; transform: none } }
        @keyframes montPulso { 0%,100% { box-shadow: 0 0 0 0 rgba(0,117,190,.55) } 60% { box-shadow: 0 0 0 9px rgba(0,117,190,0) } }
      `}</style>
    </div>
  );
}
