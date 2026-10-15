/**
 * A tela Agentes iA do simulador, espelho da tela real do CRM: cartão de
 * status (robô, "atendendo o WhatsApp", contador de conversas), os passos de
 * como a equipe trabalha com eles, e um monitor ao vivo com três conversas
 * sendo respondidas. No meio da encenação o interruptor desliga e religa,
 * para mostrar que é a pessoa quem manda.
 */
import { Bot, Clock, Eye, UserCheck } from "lucide-react";
import { useDepois, useDigitando } from "../hooks";

const CONVERSAS = [
  { nome: "Leonardo Menezes", pergunta: "Vocês atendem imobiliária?", resposta: "Atendemos sim, Leonardo. Posso te mostrar o funil que usamos com imobiliárias?", inicio: 600 },
  { nome: "Amanda Ribeiro", pergunta: "Qual o horário de vocês?", resposta: "Eu respondo 24 horas. A equipe atende das 9h às 18h, e eu já deixo tudo anotado para eles.", inicio: 2200 },
  { nome: "Paulo Vieira", pergunta: "Quero uma proposta.", resposta: "Perfeito! Me diz o nome da empresa e quantas pessoas vendem, que eu já abro a oportunidade.", inicio: 3800 },
];

function Conversa({ nome, pergunta, resposta, inicio, ligado }: (typeof CONVERSAS)[number] & { ligado: boolean }) {
  const chegou = useDepois(inicio);
  const texto = useDigitando(resposta, inicio + 700, 16);
  if (!chegou) return null;
  const iniciais = nome.split(" ").map((p) => p[0]).join("").slice(0, 2);
  return (
    <li className="rounded-lg border border-line bg-white p-2.5 text-[11px] shadow-card" style={{ animation: "simEntra .35s ease-out" }}>
      <div className="mb-1.5 flex items-center gap-2">
        <span className="flex size-6 items-center justify-center rounded-full bg-navy text-[9px] font-bold text-white">{iniciais}</span>
        <span className="font-semibold text-navy">{nome}</span>
        <span className={`ml-auto inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium ${ligado ? "bg-sky-100 text-sky-800" : "bg-amber-50 text-amber-800"}`}>
          <Bot className="size-3" /> {ligado ? "Agente iA" : "Pendente"}
        </span>
      </div>
      <p className="rounded-md bg-canvas px-2 py-1 text-ink">{pergunta}</p>
      {texto.length > 0 && (
        <p className={`mt-1 rounded-md px-2 py-1 text-white ${ligado ? "bg-sky-600" : "bg-muted"}`}>
          {texto}
          {texto.length < resposta.length && <span className="ml-px inline-block h-3 w-px animate-pulse bg-white align-middle" />}
        </p>
      )}
    </li>
  );
}

export function Agentes() {
  const desliga = useDepois(5600);
  const religa = useDepois(7200);
  const ligado = !desliga || religa;
  const n1 = useDepois(600);
  const n2 = useDepois(2200);
  const n3 = useDepois(3800);
  const agora = ligado ? [n1, n2, n3].filter(Boolean).length : 0;

  return (
    <div className="grid h-full gap-3 lg:grid-cols-[1.15fr_1fr]">
      <div className="flex flex-col gap-3">
        <section className="flex flex-col gap-3 rounded-xl border border-line bg-white p-4 shadow-card">
          <div className="flex items-center gap-3">
          <span className={`flex size-11 shrink-0 items-center justify-center rounded-full transition-colors ${ligado ? "bg-sky-100 text-sky-700" : "bg-canvas text-muted"}`}>
            <Bot className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-navy">{ligado ? "Agentes iA atendendo o WhatsApp" : "Nenhum Agente iA atendendo agora"}</p>
            <p className="text-[11px] text-muted">
              {ligado ? "Eles respondem primeiro as conversas novas e as que voltam depois de encerradas." : "Desligado por você. As conversas novas esperam a equipe."}
            </p>
          </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 border-t border-line pt-3">
          <div className="text-left">
            <p className="font-display text-2xl font-bold tabular-nums text-navy">{agora}</p>
            <p className="text-[10px] text-muted">conversas com eles agora</p>
          </div>
          <button
            type="button"
            aria-label={ligado ? "Desligar Agentes iA" : "Ligar Agentes iA"}
            className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${ligado ? "bg-sky-600" : "bg-line"}`}
          >
            <span className={`size-6 rounded-full bg-white shadow transition-transform ${ligado ? "translate-x-5" : "translate-x-0"}`} />
            {desliga && !religa && <span className="absolute -top-6 right-0 whitespace-nowrap text-[10px] font-semibold text-amber-700" style={{ animation: "simEntra .3s" }}>você desligou</span>}
            {religa && <span className="absolute -top-6 right-0 whitespace-nowrap text-[10px] font-semibold text-sky-700" style={{ animation: "simEntra .3s" }}>ligou de novo</span>}
          </button>
          <span className="ml-auto inline-flex h-8 items-center justify-center gap-1.5 rounded-lg border border-line px-3 text-[11px] font-semibold text-navy">
            <Eye className="size-3.5" /> Acompanhar em Conversas
          </span>
          </div>
        </section>

        <section className="rounded-xl border border-line bg-white p-4 shadow-card">
          <h4 className="mb-2.5 text-xs font-semibold text-navy">Como a equipe trabalha com eles</h4>
          <ul className="flex flex-col gap-2 text-[11px] text-ink">
            {[
              { I: Bot, t: "Conversa nova chega e o Agente iA atende primeiro." },
              { I: Eye, t: "Em Conversas, a aba Agentes iA mostra em tempo real quem está com eles." },
              { I: UserCheck, t: "Qualquer pessoa da equipe assume a qualquer momento, e o Agente iA para na hora." },
              { I: Clock, t: "Se ele ficar sem responder, a conversa vai para Pendentes para alguém ver." },
            ].map(({ I, t }, i) => (
              <li key={t} className="flex items-start gap-2.5" style={{ animation: `simEntra .4s ease-out ${0.3 + i * 0.15}s both` }}>
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-chip text-brand">
                  <I className="size-3.5" />
                </span>
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="flex min-h-0 flex-col rounded-xl border border-sky-200 bg-sky-50/60 p-3">
        <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-sky-900">
          <span className="relative flex size-2" aria-hidden="true">
            <span className={`absolute inline-flex size-full rounded-full bg-sky-400 opacity-75 ${ligado ? "animate-ping" : ""}`} />
            <span className={`relative inline-flex size-2 rounded-full ${ligado ? "bg-sky-500" : "bg-muted"}`} />
          </span>
          Ao vivo · {ligado ? "respondendo agora" : "em pausa"}
        </div>
        <ul className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto">
          {CONVERSAS.map((c) => (
            <Conversa key={c.nome} {...c} ligado={ligado} />
          ))}
        </ul>
      </section>
    </div>
  );
}
