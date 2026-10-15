/**
 * A ficha do contato encenada: um áudio de WhatsApp toca, a iA transcreve
 * ao vivo e o Histórico (igual ao da ficha real do CRM: bolinha com ícone,
 * tipo, hora, texto) vai ganhando registros enquanto o áudio avança. No fim,
 * um "conhecimento novo" entra na memória da pessoa. Em laço.
 */
import { AudioLines, BrainCircuit, CalendarClock, FileText, Kanban, MessageSquare, Pause, Phone, Play, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DURACAO = 14000;
const TRANSCRICAO =
  "Oi Marina, ouvi a proposta. Vou fechar o plano Professional para as duas unidades, mas o prazo de implantação precisa ser de trinta dias. Me liga quinta de manhã que eu confirmo o contrato.";

type Registro = { em: number; tipo: string; Icone: typeof Phone; texto: string; cor: string; destaque?: boolean };

const NOVOS: Registro[] = [
  { em: 1200, tipo: "Mensagem", Icone: AudioLines, texto: "WhatsApp (recebida): 🎤 Áudio 0:14 · transcrito pela iA", cor: "text-[#25D366]" },
  { em: 5200, tipo: "Resumo da iA", Icone: Sparkles, texto: "Quer fechar o Professional para 2 unidades. Condição: implantação em 30 dias.", cor: "text-sky-600" },
  { em: 8200, tipo: "Oportunidade", Icone: Kanban, texto: "Plano Professional · 2 unidades · R$ 9.600 → etapa Proposta", cor: "text-brand" },
  { em: 10600, tipo: "Tarefa", Icone: CalendarClock, texto: "Ligar para Mariana · quinta, 10h · responsável: Marina", cor: "text-amber-600" },
  { em: 12600, tipo: "Conhecimento", Icone: BrainCircuit, texto: "Prefere contato de manhã. Decide rápido quando o prazo está claro.", cor: "text-violet-600", destaque: true },
];

const ANTIGOS: Registro[] = [
  { em: 0, tipo: "Mensagem", Icone: MessageSquare, texto: "WhatsApp (enviada): proposta Professional · R$ 4.800/unidade", cor: "text-[#25D366]" },
  { em: 0, tipo: "Ligação", Icone: Phone, texto: "Marina apresentou o CRM. Ficou de mandar proposta.", cor: "text-brand" },
  { em: 0, tipo: "Proposta", Icone: FileText, texto: "Enviada por e-mail · aberta 2 vezes", cor: "text-muted" },
];

export default function MemoriaAoVivo() {
  const [t, setT] = useState(0);
  const [tocando, setTocando] = useState(true);
  const inicio = useRef<number | null>(null);
  const acumulado = useRef(0);

  useEffect(() => {
    if (!tocando) return;
    let raf = 0;
    const tick = (agora: number) => {
      if (inicio.current == null) inicio.current = agora - acumulado.current;
      const el = agora - inicio.current;
      if (el >= DURACAO + 2500) {
        inicio.current = agora;
        acumulado.current = 0;
        setT(0);
      } else {
        acumulado.current = el;
        setT(el);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      inicio.current = null;
    };
  }, [tocando]);

  const progresso = Math.min(t / DURACAO, 1);
  const letras = Math.floor(TRANSCRICAO.length * Math.min(1, Math.max(0, (t - 900) / (DURACAO - 1800))));
  const novos = NOVOS.filter((r) => t >= r.em);
  const registros = [...[...novos].reverse(), ...ANTIGOS];
  const seg = Math.floor((progresso * 14) % 60);

  return (
    <div className="overflow-hidden rounded-panel border border-line bg-white shadow-soft">
      <div className="flex items-start justify-between gap-3 border-b border-line bg-canvas px-5 py-4">
        <div>
          <h4 className="text-lg font-semibold tracking-tight text-navy">Mariana Costa</h4>
          <p className="text-xs text-muted">Clínica Viva · Criada em 22/09/2026 · Última interação agora</p>
        </div>
        <span className="flex size-9 items-center justify-center rounded-full bg-[#25D366] text-white">
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.54 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.5 0-2.97-.41-4.25-1.18l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.35c0-4.54 3.7-8.24 8.3-8.24" />
          </svg>
        </span>
      </div>

      <div className="border-b border-line bg-[#efeae2] px-5 py-4">
        <div className="ml-auto max-w-[92%] rounded-2xl rounded-bl-md bg-white p-3 shadow-card">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setTocando((v) => !v)} aria-label={tocando ? "Pausar" : "Tocar"} className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand text-white">
              {tocando ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex h-6 items-end gap-[2px]">
                {Array.from({ length: 40 }, (_, i) => {
                  const h = 5 + ((i * 7919) % 17);
                  const passou = i / 40 <= progresso;
                  return <i key={i} className={`w-[3px] origin-bottom rounded-full ${passou ? "bg-brand" : "bg-navy/25"}`} style={{ height: h, animation: tocando && passou && i / 40 > progresso - 0.08 ? "simOnda .5s ease-in-out infinite" : undefined }} />;
                })}
              </div>
              <div className="mt-1 h-1 overflow-hidden rounded-full bg-navy/10">
                <div className="h-full rounded-full bg-brand" style={{ width: `${progresso * 100}%` }} />
              </div>
            </div>
            <span className="shrink-0 font-mono text-[11px] text-muted">0:{String(seg).padStart(2, "0")}</span>
          </div>
          <p className="mt-2.5 min-h-[3.2em] text-[12px] leading-snug text-ink">
            <span className="mr-1 inline-flex items-center gap-1 rounded bg-sky-100 px-1.5 py-0.5 text-[10px] font-semibold text-sky-800">
              <Sparkles className="size-3" /> transcrição da iA
            </span>
            {TRANSCRICAO.slice(0, letras)}
            {letras > 0 && letras < TRANSCRICAO.length && <span className="ml-px inline-block h-3 w-px animate-pulse bg-navy align-middle" />}
          </p>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="mb-3 flex items-end justify-between">
          <div>
            <h5 className="font-semibold text-navy">Histórico</h5>
            <p className="text-[11px] text-muted">Cada toque com esta pessoa, do mais recente para o mais antigo.</p>
          </div>
          <span className="rounded-full bg-chip px-2.5 py-1 text-[11px] font-semibold tabular-nums text-brand">{registros.length} registros</span>
        </div>
        <ol className="relative flex flex-col gap-3 border-l border-line pl-6">
          {registros.map((r, i) => (
            <li
              key={`${r.tipo}-${r.texto}`}
              className={`relative rounded-lg text-[12px] ${r.destaque ? "border border-violet-200 bg-violet-50 p-2.5" : ""}`}
              style={i < novos.length ? { animation: "simEntra .5s ease-out" } : undefined}
            >
              <span className={`absolute -left-[31px] top-0.5 flex size-5 items-center justify-center rounded-full border-2 border-white bg-white shadow-card ${r.cor}`}>
                <r.Icone className="size-3" />
              </span>
              <p className="font-semibold text-navy">
                {r.tipo} <span className="ml-1 font-normal text-muted">{i < novos.length ? "agora" : "ontem"}</span>
              </p>
              <p className="text-ink">{r.texto}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
