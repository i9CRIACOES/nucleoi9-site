import { Mic, Paperclip, Play, Send, Smile } from "lucide-react";
import { useEffect, useRef } from "react";
import { CONVERSAS_LISTA, THREAD_INICIAL } from "../dados";
import { useDepois, useDigitando } from "../hooks";

const RESPOSTA = "Perfeito, Mariana! Vou gerar o contrato e te mando o link para assinar.";

function Balao({ de, children, hora }: { de: "eles" | "nos"; children: React.ReactNode; hora: string }) {
  const nos = de === "nos";
  return (
    <div className={`flex ${nos ? "justify-end" : "justify-start"}`} style={{ animation: "simEntra .35s ease-out" }}>
      <div className={`max-w-[82%] rounded-2xl px-3 py-2 text-[12px] leading-snug shadow-card ${nos ? "rounded-br-md bg-[#d9fdd3] text-ink" : "rounded-bl-md bg-white text-ink"}`}>
        {children}
        <span className="mt-1 block text-right text-[9px] text-muted">{hora}</span>
      </div>
    </div>
  );
}

export function Conversas() {
  const chegou = useDepois(700);
  const digitandoEles = useDepois(1700);
  const audio = useDepois(2900);
  const video = useDepois(4200);
  const respostaEnviada = useDepois(6700);
  const texto = useDigitando(RESPOSTA, 4900, 24);

  // Mensagem nova → a lista desce até o fim, como no WhatsApp.
  const lista = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lista.current?.scrollTo({ top: lista.current.scrollHeight, behavior: "smooth" });
  }, [chegou, audio, video, respostaEnviada]);

  return (
    <div className="grid h-full grid-cols-[1fr] gap-3 md:grid-cols-[220px_1fr]">
      <aside className="hidden flex-col overflow-hidden rounded-xl border border-line bg-white shadow-card md:flex">
        <div className="border-b border-line p-2">
          <div className="h-8 rounded-full border border-line bg-canvas px-3 text-[11px] leading-8 text-muted">Buscar nome ou telefone</div>
        </div>
        <ul className="flex flex-col">
          {CONVERSAS_LISTA.map((c) => (
            <li key={c.nome} className={`flex items-center gap-2 border-b border-line px-3 py-2.5 ${c.ativo ? "bg-chip/70" : ""}`}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">
                {c.nome.split(" ").map((p) => p[0]).join("").slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex justify-between gap-2">
                  <p className="truncate text-[12px] font-semibold text-navy">{c.nome}</p>
                  <span className="shrink-0 text-[10px] text-muted">{c.quando}</span>
                </div>
                <p className="truncate text-[11px] text-muted">{c.previa}</p>
              </div>
              {c.naoLidas > 0 && <span className="flex size-4 items-center justify-center rounded-full bg-success text-[9px] font-bold text-white">{c.naoLidas}</span>}
            </li>
          ))}
        </ul>
      </aside>

      <section className="flex min-h-0 flex-col overflow-hidden rounded-xl border border-line bg-[#efeae2] shadow-card">
        <header className="flex items-center gap-2 border-b border-line bg-white px-3 py-2">
          <span className="flex size-8 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">MC</span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[12px] font-semibold text-navy">Mariana Costa · Clínica Viva</p>
            <p className="text-[10px] text-success">{digitandoEles && !audio ? "digitando…" : "online · API oficial"}</p>
          </div>
          <span className="rounded-full bg-chip px-2 py-0.5 text-[10px] font-semibold text-brand">Marina</span>
        </header>

        <div ref={lista} className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
          {THREAD_INICIAL.map((m, i) => (
            <Balao key={i} de={m.de} hora={m.hora}>
              {m.texto}
            </Balao>
          ))}
          {chegou && (
            <Balao de="eles" hora="15:31">
              Fechado! Me manda o contrato que eu assino hoje ainda 🙌
            </Balao>
          )}
          {audio && (
            <Balao de="eles" hora="15:31">
              <span className="flex items-center gap-2">
                <span className="flex size-7 items-center justify-center rounded-full bg-brand text-white">
                  <Play className="size-3.5" />
                </span>
                <span className="flex h-5 items-end gap-[2px]">
                  {Array.from({ length: 22 }, (_, i) => (
                    <i key={i} className="w-[3px] origin-bottom rounded-full bg-navy/70" style={{ height: `${6 + ((i * 7) % 14)}px`, animation: `simOnda ${0.7 + (i % 5) * 0.1}s ease-in-out ${i * 0.04}s infinite` }} />
                  ))}
                </span>
                <span className="text-[10px] text-muted">0:09</span>
              </span>
            </Balao>
          )}
          {video && (
            <Balao de="eles" hora="15:32">
              <span className="relative flex h-24 w-40 items-center justify-center overflow-hidden rounded-lg bg-[radial-gradient(circle_at_30%_30%,#2790d2,#0f3349)]">
                <span className="flex size-9 items-center justify-center rounded-full bg-white/90 text-navy">
                  <Play className="size-4" />
                </span>
                <span className="absolute bottom-1 right-1.5 rounded bg-black/50 px-1 text-[9px] text-white">0:14</span>
              </span>
              <span className="mt-1 block">Olha a recepção da clínica, vai ficar linda!</span>
            </Balao>
          )}
          {respostaEnviada && (
            <Balao de="nos" hora="15:33">
              {RESPOSTA} ✓✓
            </Balao>
          )}
        </div>

        <footer className="flex items-center gap-2 border-t border-line bg-white px-3 py-2">
          <Smile className="size-4 text-muted" />
          <Paperclip className="size-4 text-muted" />
          <div className="flex h-8 flex-1 items-center rounded-full border border-line bg-canvas px-3 text-[11px] text-ink">
            {respostaEnviada ? <span className="text-muted">Escreva a resposta</span> : texto}
            {!respostaEnviada && texto.length > 0 && texto.length < RESPOSTA.length && <span className="ml-px h-3.5 w-px animate-pulse bg-navy" />}
          </div>
          {texto.length > 0 && !respostaEnviada ? (
            <span className="flex size-8 items-center justify-center rounded-full bg-brand text-white">
              <Send className="size-4" />
            </span>
          ) : (
            <Mic className="size-4 text-muted" />
          )}
        </footer>
      </section>
    </div>
  );
}
