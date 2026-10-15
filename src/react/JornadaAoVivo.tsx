/**
 * A jornada do lead em seis fases, encenada: uma régua no topo com a linha
 * enchendo, o texto da fase à esquerda e, à direita, uma cena curta de cada
 * passo acontecendo no CRM (lead entrando, robô respondendo, follow-up,
 * lembrete, oportunidade mudando de etapa, venda). Avança sozinha; clicar
 * numa fase pula para ela.
 */
import { BellRing, Bot, Check, FileSignature, Kanban, Megaphone, RotateCcw, Trophy, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { JORNADA, type Fase } from "../lib/conteudo";

const DURACAO = 4200;
const ICONES: Record<string, typeof Bot> = { UserPlus, Bot, RotateCcw, BellRing, Kanban, Trophy };

function Cena({ i, rodada }: { i: number; rodada: number }) {
  const k = `${i}-${rodada}`;
  const bolha = "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-card";
  switch (i) {
    case 0:
      return (
        <div key={k} className="flex flex-col gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-white p-3 shadow-card" style={{ animation: "simEntra .5s ease-out .2s both" }}>
            <span className="flex size-8 items-center justify-center rounded-lg bg-pink-50 text-pink-600"><Megaphone className="size-4" /></span>
            <div className="text-[12px]"><p className="font-semibold text-navy">Novo lead · Instagram Ads</p><p className="text-muted">Mariana Costa · Clínica Viva · agora</p></div>
          </div>
          <div className="ml-6 h-5 w-px bg-brand/40" style={{ animation: "simEntra .4s ease-out .9s both" }} />
          <div className="flex items-center gap-2 rounded-xl border border-line bg-canvas p-3 text-[12px]" style={{ animation: "simEntra .5s ease-out 1.2s both" }}>
            <span className="flex size-7 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">MA</span>
            <p className="text-navy">Responsável: <b>Marina</b> · etapa <b>Novo lead</b> · 10%</p>
            <span className="ml-auto rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-bold text-[#1f8f43]">no funil</span>
          </div>
        </div>
      );
    case 1:
      return (
        <div key={k} className="flex flex-col gap-2 rounded-xl bg-[#efeae2] p-3">
          <p className={`${bolha} self-start bg-white text-ink`} style={{ animation: "simEntra .4s ease-out .1s both" }}>Oi! Vi o anúncio. Vocês atendem clínica?</p>
          <p className={`${bolha} self-end bg-sky-600 text-white`} style={{ animation: "simEntra .4s ease-out 1.1s both" }}>
            <span className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-sky-100"><Bot className="size-3" /> Agente iA · 8 s</span>
            Atendemos sim, Mariana! Posso te mostrar como funciona e já agendar uma avaliação?
          </p>
          <p className={`${bolha} self-start bg-white text-ink`} style={{ animation: "simEntra .4s ease-out 2.2s both" }}>Quero sim. Quanto custa?</p>
          <p className={`${bolha} self-end bg-sky-600 text-white`} style={{ animation: "simEntra .4s ease-out 3s both" }}>Depende do tamanho da clínica. Me diz quantas unidades e eu te passo certinho. Já anotei seu interesse.</p>
        </div>
      );
    case 2:
      return (
        <div key={k} className="flex flex-col gap-2 rounded-xl bg-[#efeae2] p-3">
          <p className={`${bolha} self-end bg-[#d9fdd3] text-ink opacity-70`}>Mariana, segue a proposta. Qualquer dúvida estou aqui.</p>
          <p className="self-center rounded-full bg-white/70 px-3 py-1 text-[10px] font-semibold text-muted" style={{ animation: "simEntra .4s ease-out .8s both" }}>sem resposta · 24 h</p>
          <p className="self-end rounded-md bg-brand/15 px-2 py-0.5 text-[10px] font-bold text-brand" style={{ animation: "simEntra .4s ease-out 1.8s both" }}>✦ Follow-up automático</p>
          <p className={`${bolha} self-end bg-[#d9fdd3] text-ink`} style={{ animation: "simEntra .4s ease-out 2.1s both" }}>Passando para saber se ficou alguma dúvida sobre a proposta. Posso te ajudar por aqui 😊</p>
          <p className={`${bolha} self-start bg-white text-ink`} style={{ animation: "simEntra .4s ease-out 3.3s both" }}>Oi! Esqueci de responder. Vamos marcar uma conversa?</p>
        </div>
      );
    case 3:
      return (
        <div key={k} className="flex flex-col gap-2">
          {[
            { para: "Cliente · Mariana", texto: "Sua reunião com a Marina é amanhã às 10h. Confirma?", d: 0.1 },
            { para: "Vendedora · Marina", texto: "Reunião em 1 hora: Mariana · Clínica Viva · ver histórico", d: 1.2 },
            { para: "CRM · tarefa", texto: "Reunião confirmada pelo cliente ✓ · lembrete registrado", d: 2.4, ok: true },
          ].map((n) => (
            <div key={n.para} className={`flex gap-3 rounded-xl p-3 shadow-card ${n.ok ? "bg-success/15" : "bg-white"}`} style={{ animation: `simEntra .5s ease-out ${n.d}s both` }}>
              <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${n.ok ? "bg-success text-white" : "bg-chip text-brand"}`}>{n.ok ? <Check className="size-4" /> : <BellRing className="size-4" />}</span>
              <div className="text-[12px]"><p className="font-semibold text-navy">{n.para}</p><p className="text-ink">{n.texto}</p></div>
            </div>
          ))}
        </div>
      );
    case 4:
      return (
        <div key={k} className="grid grid-cols-3 gap-2">
          {["Qualificado", "Proposta", "Ganha"].map((col, c) => (
            <div key={col} className={`min-h-[150px] rounded-xl border border-line p-2 ${c === 2 ? "bg-success/10" : "bg-white"}`}>
              <p className="mb-2 text-[10px] font-semibold text-navy">{col}</p>
              {c === 1 && (
                <div className="rounded-lg border border-brand bg-white p-2 text-[10px] shadow-soft" style={{ animation: "jornadaMove 1.1s cubic-bezier(.2,.7,.2,1) .6s both" }}>
                  <p className="font-semibold text-navy">Plano Professional</p>
                  <p className="text-muted">Mariana · 2 unidades</p>
                  <p className="mt-1 font-semibold tabular-nums text-navy">R$ 9.600</p>
                  <span className="mt-1 inline-block rounded-full bg-chip px-1.5 py-0.5 text-[9px] font-semibold text-brand" style={{ animation: "simEntra .4s ease-out 1.9s both" }}>criada pela iA</span>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    default:
      return (
        <div key={k} className="relative grid grid-cols-3 gap-2">
          {["Qualificado", "Proposta", "Ganha"].map((col, c) => (
            <div key={col} className={`min-h-[150px] rounded-xl border border-line p-2 ${c === 2 ? "bg-success/10" : "bg-white"}`}>
              <p className="mb-2 text-[10px] font-semibold text-navy">{col}</p>
              {c === 2 && (
                <div className="rounded-lg border border-success bg-white p-2 text-[10px] shadow-soft" style={{ animation: "jornadaMove 1.1s cubic-bezier(.2,.7,.2,1) .5s both" }}>
                  <p className="font-semibold text-navy">Plano Professional</p>
                  <p className="text-muted">Mariana · 2 unidades</p>
                  <p className="mt-1 font-semibold tabular-nums text-navy">R$ 9.600</p>
                  <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-success px-1.5 py-0.5 text-[9px] font-bold text-white"><Trophy className="size-2.5" /> Ganha</span>
                </div>
              )}
            </div>
          ))}
          <div className="col-span-3 flex items-center gap-2 rounded-xl bg-navy p-3 text-[12px] text-white" style={{ animation: "simEntra .5s ease-out 1.8s both" }}>
            <FileSignature className="size-4 text-success" /> Contrato assinado no celular · histórico completo guardado
          </div>
          <div className="pointer-events-none absolute right-[14%] top-8" aria-hidden="true">
            {Array.from({ length: 22 }, (_, j) => {
              const ang = (j / 22) * Math.PI * 2;
              const dist = 60 + (j % 4) * 18;
              return <span key={j} className="absolute block h-2 w-1.5 rounded-sm" style={{ background: ["#0075BE", "#35CC62", "#2790D2", "#F59E0B"][j % 4], ["--dx" as string]: `${Math.cos(ang) * dist}px`, ["--dy" as string]: `${Math.sin(ang) * dist + 50}px`, animation: `simConfete ${0.9 + (j % 3) * 0.2}s cubic-bezier(.2,.7,.3,1) 1.4s both` }} />;
            })}
          </div>
        </div>
      );
  }
}

export default function JornadaAoVivo() {
  const [i, setI] = useState(0);
  const [rodada, setRodada] = useState(0);
  const [pausado, setPausado] = useState(false);
  const fases = JORNADA.fases;
  const fase: Fase = fases[i];

  useEffect(() => {
    if (pausado) return;
    const t = setTimeout(() => setI((x) => (x + 1) % fases.length), DURACAO);
    return () => clearTimeout(t);
  }, [i, rodada, pausado, fases.length]);

  const irPara = (n: number) => {
    setI(n);
    setRodada((r) => r + 1);
  };

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-soft" onMouseEnter={() => setPausado(true)} onMouseLeave={() => setPausado(false)}>
      <ol className="relative grid grid-cols-3 gap-y-5 border-b border-line px-4 py-6 sm:grid-cols-6 sm:px-8">
        <div className="absolute left-[8%] right-[8%] top-[38px] hidden h-0.5 bg-line sm:block" aria-hidden="true" />
        <div className="absolute left-[8%] top-[38px] hidden h-0.5 bg-brand transition-[width] duration-700 sm:block" style={{ width: `${(i / (fases.length - 1)) * 84}%` }} aria-hidden="true" />
        {fases.map((f, n) => {
          const I = ICONES[f.icone] ?? Bot;
          const feita = n < i;
          const ativa = n === i;
          return (
            <li key={f.num} className="relative flex flex-col items-center gap-2 text-center">
              <button
                type="button"
                onClick={() => irPara(n)}
                aria-current={ativa ? "step" : undefined}
                className={`relative z-10 flex size-10 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold transition-all ${
                  ativa ? "scale-110 border-brand bg-brand text-white shadow-soft" : feita ? "border-brand bg-white text-brand" : "border-line bg-white text-muted"
                }`}
              >
                {feita ? <Check className="size-4" /> : f.num}
                {ativa && <span className="absolute inset-0 animate-ping rounded-full bg-brand/40" aria-hidden="true" />}
              </button>
              <span className={`text-[11px] font-semibold leading-tight ${ativa ? "text-navy" : "text-muted"}`}>{f.nome}</span>
              <I className="hidden" />
            </li>
          );
        })}
      </ol>

      <div className="grid gap-6 p-5 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        <div key={`t-${i}-${rodada}`} style={{ animation: "simEntra .45s ease-out" }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
            {fase.num} · {fase.nome}
          </p>
          <h3 className="garrafal mt-2 text-[clamp(1.6rem,3vw,2.4rem)] text-navy">{fase.titulo}</h3>
          <p className="mt-3 text-base leading-relaxed text-muted">{fase.texto}</p>
          <p className="mt-5 flex flex-wrap items-center gap-1.5 rounded-xl border-l-4 border-brand bg-canvas px-4 py-3 text-sm font-semibold text-navy">
            {fase.formula.map((p, j) => (
              <span key={p} className="inline-flex items-center gap-1.5">
                {j > 0 && <span className="text-brand">→</span>}
                {p}
              </span>
            ))}
          </p>
        </div>
        <div className="min-h-[230px] rounded-xl border border-line bg-canvas p-3 sm:p-4">
          <Cena i={i} rodada={rodada} />
        </div>
      </div>

      <div className="flex gap-1 px-5 pb-4 sm:px-8">
        {fases.map((f, n) => (
          <button key={f.num} type="button" aria-label={f.nome} onClick={() => irPara(n)} className="h-1 flex-1 overflow-hidden rounded-full bg-line">
            <span key={`${n}-${rodada}-${i}`} className={`block h-full bg-brand ${n < i ? "w-full" : n === i && !pausado ? "animate-[simBarra_linear_forwards]" : "w-0"}`} style={n === i ? { animationDuration: `${DURACAO}ms` } : undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}
