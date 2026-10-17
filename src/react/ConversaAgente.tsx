/**
 * Conversa de WhatsApp encenada: o lead pergunta, o Agente iA responde,
 * qualifica e marca a reunião, que aparece no fim como um evento do Google
 * Agenda. Mensagens entram uma a uma com "digitando...". Roda quando está na
 * tela e recomeça sozinha; com `prefers-reduced-motion`, mostra tudo parado.
 */
import { Bot, CalendarCheck, CheckCheck, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { AGENTES } from "../lib/conteudo";

const { contato, agente, mensagens, evento } = AGENTES.conversa;

type Etapa = { tipo: "digitando"; de: "cliente" | "ia" } | { tipo: "msg"; i: number } | { tipo: "evento" };

/** Roteiro puro: cada mensagem de pessoa vem depois de um "digitando". */
export function montarEtapas(): Etapa[] {
  const out: Etapa[] = [];
  mensagens.forEach((m, i) => {
    if (m.de === "cliente" || m.de === "ia") out.push({ tipo: "digitando", de: m.de as "cliente" | "ia" });
    out.push({ tipo: "msg", i });
  });
  out.push({ tipo: "evento" });
  return out;
}

function tempoDa(e: Etapa): number {
  if (e.tipo === "digitando") return e.de === "ia" ? 1300 : 900;
  if (e.tipo === "evento") return 6500; // fica na tela antes de recomeçar
  const m = mensagens[e.i];
  return Math.min(1900, 550 + m.texto.length * 11);
}

export default function ConversaAgente() {
  const etapas = useMemo(montarEtapas, []);
  const [menos] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [passo, setPasso] = useState(menos ? etapas.length : 0);
  const [visivel, setVisivel] = useState(false);
  const raiz = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = raiz.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (menos || !visivel) return;
    const atual = etapas[Math.min(passo, etapas.length - 1)];
    const t = setTimeout(() => setPasso((p) => (p >= etapas.length ? 0 : p + 1)), passo === 0 ? 500 : tempoDa(atual));
    return () => clearTimeout(t);
  }, [passo, visivel, menos, etapas]);

  // Desce até a última mensagem dentro do celular, sem rolar a página.
  useEffect(() => {
    const l = lista.current;
    if (l) l.scrollTo({ top: l.scrollHeight, behavior: menos ? "auto" : "smooth" });
  }, [passo, menos]);

  const feitas = etapas.slice(0, passo);
  const mostradas = feitas.filter((e): e is { tipo: "msg"; i: number } => e.tipo === "msg").map((e) => e.i);
  const agora = etapas[passo - 1];
  const digitando = !menos && agora?.tipo === "digitando" ? agora.de : null;
  const comEvento = feitas.some((e) => e.tipo === "evento") || menos;
  const entra = menos ? undefined : "convEntra .4s cubic-bezier(.2,.9,.3,1.15) both";

  return (
    <div ref={raiz} className="mx-auto w-full max-w-sm">
      <div className="rounded-[2rem] border border-white/10 bg-[#0b2436] p-3 shadow-soft">
        <div className="flex items-center gap-3 rounded-t-[1.5rem] bg-[#184e6c] px-4 py-3">
          <span className="flex size-9 items-center justify-center rounded-full bg-brand-light text-white">
            <Bot className="size-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="truncate text-sm font-semibold text-white">{agente}</p>
            <p className="text-[11px] text-success" aria-live="polite">
              {digitando === "ia" ? "digitando…" : digitando === "cliente" ? `${contato.split(" ")[0]} está digitando…` : "Agente iA ligado"}
            </p>
          </div>
          <span className="ml-auto inline-flex h-6 w-11 items-center rounded-full bg-success p-0.5" aria-label="Agente iA ligado">
            <span className="ml-auto size-5 rounded-full bg-white" />
          </span>
        </div>

        <ol
          ref={lista}
          className="flex h-[440px] flex-col gap-2 overflow-y-auto rounded-b-[1.5rem] bg-[#0f3349] p-4 [scrollbar-width:none]"
          aria-label={`Conversa de exemplo entre ${contato} e o Agente iA`}
        >
          {mostradas.map((i) => {
            const m = mensagens[i];
            if (m.de === "qualifica") {
              return (
                <li key={i} className="self-center" style={{ animation: entra }}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg bg-success/20 px-3 py-1.5 text-center text-[11px] font-semibold text-success">
                    <Sparkles className="size-3.5 shrink-0" aria-hidden="true" /> {m.texto}
                  </span>
                </li>
              );
            }
            const ia = m.de === "ia";
            return (
              <li
                key={i}
                className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${ia ? "self-end rounded-br-md bg-brand text-white" : "self-start rounded-bl-md bg-white text-ink"}`}
                style={{ animation: entra }}
              >
                {m.texto}
                {ia && <CheckCheck className="ml-1 inline size-3.5 text-brand-light" aria-hidden="true" />}
              </li>
            );
          })}

          {digitando && (
            <li
              className={`flex gap-1 rounded-2xl px-3.5 py-3 ${digitando === "ia" ? "self-end rounded-br-md bg-brand" : "self-start rounded-bl-md bg-white"}`}
              style={{ animation: entra }}
              aria-hidden="true"
            >
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  className={`size-1.5 rounded-full ${digitando === "ia" ? "bg-white/80" : "bg-muted"}`}
                  style={{ animation: `convPonto 1s ease-in-out ${k * 0.15}s infinite` }}
                />
              ))}
            </li>
          )}

          {comEvento && (
            <li className="mt-1 w-full" style={{ animation: menos ? undefined : "convEntra .55s cubic-bezier(.2,.9,.3,1.2) both" }}>
              <div className="overflow-hidden rounded-xl bg-white text-ink shadow-soft">
                <div className="flex items-center gap-2 border-b border-line px-3 py-2">
                  <span className="flex size-6 items-center justify-center rounded-md bg-[#1a73e8] text-white">
                    <CalendarCheck className="size-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-semibold text-muted">Google Agenda · evento novo</span>
                </div>
                <div className="flex gap-3 px-3 py-2.5">
                  <span className="w-1 shrink-0 rounded-full bg-[#1a73e8]" />
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-navy">{evento.titulo}</p>
                    <p className="text-xs text-muted">{evento.quando}</p>
                    <p className="text-xs text-muted">Com {evento.com}</p>
                    <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-chip px-2 py-0.5 text-[10px] font-semibold text-brand">
                      <Bot className="size-3" aria-hidden="true" /> {evento.selo}
                    </span>
                  </div>
                </div>
                <p className="bg-success/15 px-3 py-1.5 text-[11px] font-semibold text-[#1f8f43]">{evento.funil}</p>
              </div>
            </li>
          )}
        </ol>
      </div>

      {!menos && (
        <button
          type="button"
          onClick={() => setPasso(0)}
          className="mx-auto mt-3 flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium text-sidebar-fg transition-colors hover:text-white"
        >
          <RotateCcw className="size-3.5" aria-hidden="true" /> Ver a conversa de novo
        </button>
      )}

      <style>{`
        @keyframes convEntra { from { opacity: 0; transform: translateY(10px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes convPonto { 0%,100% { opacity: .35; transform: translateY(0) } 50% { opacity: 1; transform: translateY(-3px) } }
      `}</style>
    </div>
  );
}
