/**
 * O cartão "Agente iA atendendo agora" do simulador, com o mesmo visual do
 * painel de Conversas do CRM: ponto azul pulsando, robô, faixa azul-clara e
 * botão Assumir. Mostra o robô respondendo um cliente em tempo real e deixa
 * abrir a conversa inteira com um clique.
 */
import { Bot, ChevronDown, ChevronUp, Hand } from "lucide-react";
import { useState } from "react";
import { useDepois, useDigitando } from "../hooks";

const CLIENTE = "Leonardo Menezes";
const EMPRESA = "LM Imóveis";
const R1 = "Oi, Leonardo! Sou o assistente da Empresa Demonstração. O plano Professional inclui Agentes iA e até 10 números. Quer que eu agende uma demonstração?";
const R2 = "Quinta às 10h está livre. Confirmo no seu nome? Já deixo o Rafael, do comercial, avisado.";

export function AgenteAoVivo({ inicio = 800 }: { inicio?: number }) {
  const [aberto, setAberto] = useState(false);
  const visivel = useDepois(inicio);
  const c1 = useDepois(inicio + 500);
  const digitando1 = useDepois(inicio + 1200);
  const r1 = useDigitando(R1, inicio + 1900, 18);
  const c2 = useDepois(inicio + 5200);
  const r2 = useDigitando(R2, inicio + 6300, 20);
  const respondendo = (digitando1 && r1.length < R1.length) || (c2 && r2.length < R2.length);

  if (!visivel) return null;

  return (
    <aside
      className="absolute bottom-3 right-3 z-20 w-[min(360px,calc(100%-24px))] overflow-hidden rounded-xl border border-sky-200 bg-white shadow-soft"
      style={{ animation: "simEntra .4s ease-out" }}
      aria-live="polite"
    >
      <div className="flex items-center gap-2.5 border-b border-sky-200 bg-sky-50 px-3 py-2 text-[12px] text-sky-900">
        <span className="relative flex size-2.5 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-sky-500" />
        </span>
        <Bot className="size-4 shrink-0" aria-hidden="true" />
        <p className="min-w-0 flex-1 leading-tight">
          <span className="font-semibold">Agente iA {respondendo ? "respondendo" : "atendendo"} agora.</span>
          <span className="block truncate text-sky-800/80">
            {CLIENTE} · {EMPRESA}
          </span>
        </p>
        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          className={`inline-flex h-7 shrink-0 items-center gap-1 rounded-full bg-sky-600 px-2.5 text-[11px] font-semibold text-white ${aberto ? "" : "animate-pulse"}`}
        >
          {aberto ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          {aberto ? "Fechar" : "Ver em tempo real"}
        </button>
      </div>

      <div className={`flex flex-col gap-1.5 bg-[#efeae2] px-3 py-2.5 text-[11px] leading-snug ${aberto ? "max-h-64 overflow-y-auto" : "max-h-24 overflow-hidden"}`}>
        {c1 && (
          <p className="max-w-[88%] self-start rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 text-ink shadow-card" style={{ animation: "simEntra .3s ease-out" }}>
            Quero entender melhor os planos. Tem demonstração?
          </p>
        )}
        {digitando1 && r1.length === 0 && (
          <p className="self-end text-[10px] italic text-muted">Agente iA digitando…</p>
        )}
        {r1.length > 0 && (
          <p className="max-w-[88%] self-end rounded-xl rounded-br-sm bg-sky-600 px-2.5 py-1.5 text-white shadow-card">
            <span className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-sky-100">
              <Bot className="size-3" /> Agente iA
            </span>
            {r1}
            {r1.length < R1.length && <span className="ml-px inline-block h-3 w-px animate-pulse bg-white align-middle" />}
          </p>
        )}
        {c2 && (
          <p className="max-w-[88%] self-start rounded-xl rounded-bl-sm bg-white px-2.5 py-1.5 text-ink shadow-card" style={{ animation: "simEntra .3s ease-out" }}>
            Quero sim! Pode ser quinta de manhã?
          </p>
        )}
        {r2.length > 0 && (
          <p className="max-w-[88%] self-end rounded-xl rounded-br-sm bg-sky-600 px-2.5 py-1.5 text-white shadow-card">
            <span className="mb-0.5 flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-sky-100">
              <Bot className="size-3" /> Agente iA
            </span>
            {r2}
            {r2.length < R2.length && <span className="ml-px inline-block h-3 w-px animate-pulse bg-white align-middle" />}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-line bg-white px-3 py-2 text-[10px] text-muted">
        <span>Assuma quando quiser: ele para na hora.</span>
        <span className="inline-flex h-7 items-center gap-1 rounded-full border border-line px-2.5 text-[11px] font-semibold text-navy">
          <Hand className="size-3.5" /> Assumir
        </span>
      </div>
    </aside>
  );
}

/** O chip "Agente iA" da linha, igual ao da lista de conversas do CRM. */
export function ChipAgente({ ativo = true }: { ativo?: boolean }) {
  return (
    <span className="inline-flex items-center gap-1 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-medium text-sky-800">
      {ativo && (
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-sky-500" />
        </span>
      )}
      <Bot className="size-3" /> Agente iA
    </span>
  );
}
