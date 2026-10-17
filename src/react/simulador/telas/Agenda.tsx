/**
 * Agenda da semana, como no CRM: cada pessoa com o próprio Google Agenda,
 * o admin vendo todas. Na encenação, reuniões e vendas entram uma a uma, o
 * Agente iA esbarra num horário ocupado, confere e marca no seguinte livre.
 */
import { AlertTriangle, Bot, CalendarCheck, CalendarDays, ChevronLeft, ChevronRight, CircleDollarSign } from "lucide-react";
import { VENDEDORES } from "../dados";
import { useEtapas, useMenosMovimento } from "../hooks";

const DIAS = ["Seg 19", "Ter 20", "Qua 21", "Qui 22", "Sex 23"];
const INICIO = 8;
const FIM = 18;
const HORAS = Array.from({ length: FIM - INICIO }, (_, i) => INICIO + i);

type Pessoa = "MA" | "RA" | "CA";
type Evento = {
  dia: number;
  inicio: number; // em horas, 14.5 = 14:30
  duracao: number;
  titulo: string;
  quem: Pessoa;
  tipo?: "venda" | "ocupado";
  agente?: boolean;
};

const COR: Record<Pessoa, string> = Object.fromEntries(VENDEDORES.map((v) => [v.iniciais, v.cor])) as Record<Pessoa, string>;

/** O que já estava na agenda de cada um, vindo do Google. */
const FIXOS: Evento[] = [
  { dia: 0, inicio: 9, duracao: 1, titulo: "Reunião da equipe", quem: "MA" },
  { dia: 1, inicio: 14, duracao: 1, titulo: "Visita · Lima Engenharia", quem: "RA" },
  { dia: 2, inicio: 10, duracao: 1, titulo: "Retorno · Prado Contábil", quem: "CA" },
  { dia: 3, inicio: 15, duracao: 1, titulo: "Compromisso no Google", quem: "MA", tipo: "ocupado" },
  { dia: 4, inicio: 14, duracao: 1.5, titulo: "Treinamento do time", quem: "RA" },
];

type Passo = { em: number; evento?: Evento; conflito?: true; toast: { icone: "ok" | "venda" | "alerta"; titulo: string; texto: string } };

const PASSOS: Passo[] = [
  {
    em: 900,
    evento: { dia: 2, inicio: 14, duracao: 1, titulo: "Reunião com Mariana Costa · Clínica Viva", quem: "MA" },
    toast: { icone: "ok", titulo: "Reunião confirmada no Google Agenda", texto: "Qua, 14:00 · Marina" },
  },
  {
    em: 2600,
    evento: { dia: 1, inicio: 11, duracao: 1, titulo: "Proposta fechada · Plano Professional", quem: "RA", tipo: "venda" },
    toast: { icone: "venda", titulo: "Venda registrada", texto: "Plano Professional · R$ 4.800" },
  },
  {
    em: 4300,
    conflito: true,
    toast: { icone: "alerta", titulo: "Quinta às 15:00 já está ocupado", texto: "O Agente iA conferiu a agenda e ofereceu 16:30" },
  },
  {
    em: 5900,
    evento: { dia: 3, inicio: 16.5, duracao: 1, titulo: "Demonstração · Leonardo Menezes", quem: "MA", agente: true },
    toast: { icone: "ok", titulo: "Reunião confirmada no Google Agenda", texto: "Qui, 16:30 · marcada pelo Agente iA no WhatsApp" },
  },
  {
    em: 7500,
    evento: { dia: 4, inicio: 10, duracao: 1, titulo: "Avaliação · Studio AR", quem: "CA", agente: true },
    toast: { icone: "ok", titulo: "Reunião confirmada no Google Agenda", texto: "Sex, 10:00 · Camila" },
  },
];

const TEMPOS = PASSOS.map((p) => p.em);

const hora = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

function Cartao({ e, novo, alerta }: { e: Evento; novo?: boolean; alerta?: boolean }) {
  const cor = COR[e.quem];
  const venda = e.tipo === "venda";
  const ocupado = e.tipo === "ocupado";
  return (
    <div
      className={`absolute inset-x-0.5 overflow-hidden rounded-md border-l-[3px] px-1.5 py-1 text-[9.5px] leading-tight shadow-card sm:text-[10px] ${
        venda ? "bg-success/15 text-ink" : ocupado ? "bg-[repeating-linear-gradient(135deg,#f1f5f9_0_6px,#e2e8f0_6px_12px)] text-muted" : "bg-white text-ink"
      }`}
      style={{
        top: `${((e.inicio - INICIO) / (FIM - INICIO)) * 100}%`,
        height: `calc(${(e.duracao / (FIM - INICIO)) * 100}% - 2px)`,
        borderLeftColor: venda ? "#35CC62" : ocupado ? "#94a3b8" : cor,
        animation: novo ? "simToast .45s cubic-bezier(.2,.9,.3,1.2) both" : alerta ? "simAlerta 1s ease-out 2" : undefined,
        outline: alerta ? "2px solid #dc2626" : undefined,
      }}
    >
      <p className="flex items-center gap-1 font-semibold">
        {venda && <CircleDollarSign className="size-3 shrink-0 text-[#1f8f43]" />}
        <span className={e.agente ? "truncate" : "line-clamp-2"}>{e.titulo}</span>
      </p>
      <p className="truncate text-[9px] text-muted">
        {hora(e.inicio)} · {VENDEDORES.find((v) => v.iniciais === e.quem)?.nome}
      </p>
      {e.agente && (
        <span className="mt-0.5 inline-flex max-w-full items-center gap-0.5 truncate rounded-full bg-chip px-1 py-px text-[8.5px] font-semibold text-brand">
          <Bot className="size-2.5 shrink-0" /> Marcado pelo Agente iA
        </span>
      )}
    </div>
  );
}

export function Agenda() {
  const menos = useMenosMovimento();
  const feitos = useEtapas(TEMPOS, menos);
  const ultimo = feitos > 0 ? PASSOS[feitos - 1] : null;
  const emConflito = ultimo?.conflito === true;
  const novos = PASSOS.slice(0, feitos).filter((p) => p.evento);

  const IconeToast = ultimo?.toast.icone === "venda" ? CircleDollarSign : ultimo?.toast.icone === "alerta" ? AlertTriangle : CalendarCheck;

  return (
    <div className="relative flex h-full min-w-[540px] flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 rounded-lg border border-line bg-white px-1.5 py-1 text-[11px] font-semibold text-navy shadow-card">
          <ChevronLeft className="size-3.5 text-muted" />
          <CalendarDays className="size-3.5 text-brand" /> 19 a 23 de outubro
          <ChevronRight className="size-3.5 text-muted" />
        </div>
        <div className="flex rounded-lg bg-canvas p-0.5 text-[10px] font-semibold">
          <span className="rounded-md px-2 py-1 text-muted">Minha agenda</span>
          <span className="rounded-md bg-white px-2 py-1 text-navy shadow-card">Todas · admin</span>
        </div>
        <ul className="flex items-center gap-1.5">
          {VENDEDORES.map((v) => (
            <li key={v.iniciais} className="flex items-center gap-1 text-[10px] text-muted">
              <span className="size-2 rounded-full" style={{ background: v.cor }} />
              {v.nome}
            </li>
          ))}
        </ul>
        <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-[#1f8f43]">
          <span className="size-1.5 rounded-full bg-success" /> Google Agenda conectado
        </span>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <div className="flex w-9 shrink-0 flex-col border-r border-line pt-6">
          <div className="relative flex-1">
            {HORAS.map((h, i) => (
              <span key={h} className="absolute right-1 -translate-y-1/2 text-[9px] text-muted" style={{ top: `${(i / HORAS.length) * 100}%` }}>
                {i > 0 ? `${h}h` : ""}
              </span>
            ))}
          </div>
        </div>
        <div className="grid min-w-0 flex-1 grid-cols-5">
          {DIAS.map((d, di) => (
            <div key={d} className="flex min-w-0 flex-col border-r border-line last:border-r-0">
              <p className={`h-6 shrink-0 border-b border-line text-center text-[10px] font-semibold leading-6 ${di === 2 ? "bg-chip text-brand" : "text-navy"}`}>{d}</p>
              <div className="relative flex-1 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_calc(10%-1px),#eef2f6_calc(10%-1px),#eef2f6_10%)]">
                {FIXOS.filter((e) => e.dia === di).map((e) => (
                  <Cartao key={e.titulo} e={e} alerta={emConflito && e.tipo === "ocupado"} />
                ))}
                {novos
                  .filter((p) => p.evento!.dia === di)
                  .map((p) => (
                    <Cartao key={p.evento!.titulo} e={p.evento!} novo={!menos} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {ultimo && (
        <div
          key={feitos}
          role="status"
          className={`absolute bottom-3 left-12 z-10 flex max-w-[270px] items-start gap-2 rounded-xl border bg-white p-2.5 shadow-soft ${
            emConflito ? "border-amber-300" : "border-line"
          }`}
          style={{ animation: menos ? undefined : "simToast .4s ease-out" }}
        >
          <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${
              emConflito ? "bg-amber-100 text-amber-700" : ultimo.toast.icone === "venda" ? "bg-success/15 text-[#1f8f43]" : "bg-chip text-brand"
            }`}
          >
            <IconeToast className="size-4" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[11px] font-semibold text-navy">{ultimo.toast.titulo}</p>
            <p className="mt-0.5 text-[10px] text-muted">{ultimo.toast.texto}</p>
          </div>
        </div>
      )}
    </div>
  );
}
