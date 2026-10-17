/**
 * O painel do CRM encenado: moldura igual à real (barra lateral navy com
 * ícone e rótulo, cabeçalho, fundo claro) e um roteiro que passa pelas
 * telas sozinho. Clicar num item da barra pula para aquela tela.
 */
import { Bot, Building2, CalendarDays, Home, Kanban, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { IconeWhatsapp } from "./IconeWhatsapp";
import { Dashboard } from "./telas/Dashboard";
import { Contatos } from "./telas/Contatos";
import { Conversas } from "./telas/Conversas";
import { Agenda } from "./telas/Agenda";
import { Empresas } from "./telas/Empresas";
import { Funil } from "./telas/Funil";
import { Agentes } from "./telas/Agentes";
import { PASSOS, TELAS, indiceDaTela, proximo, type Tela } from "./roteiro";

const ICONES: Record<Tela, React.ComponentType<{ className?: string }>> = {
  dashboard: Home,
  contatos: Users,
  conversas: IconeWhatsapp,
  agenda: CalendarDays,
  empresas: Building2,
  funil: Kanban,
  agentes: Bot,
};

const TITULOS: Record<Tela, { titulo: string; sub: string }> = {
  dashboard: { titulo: "Dashboard", sub: "Resultados do mês, com comparação" },
  contatos: { titulo: "Contatos", sub: "Todas as pessoas na sua base" },
  conversas: { titulo: "Conversas", sub: "WhatsApp: quem está esperando resposta" },
  agenda: { titulo: "Agenda", sub: "A semana da equipe, ligada ao Google Agenda de cada um" },
  empresas: { titulo: "Empresas", sub: "Cadastro, contatos e negociações" },
  funil: { titulo: "Funil de vendas", sub: "Arraste os cards entre as etapas" },
  agentes: { titulo: "Agentes iA", sub: "Quem atende primeiro no WhatsApp da conta" },
};

export default function Simulador() {
  const [indice, setIndice] = useState(0);
  const [rodada, setRodada] = useState(0);
  const [pausado, setPausado] = useState(false);
  const passo = PASSOS[indice];

  useEffect(() => {
    if (pausado) return;
    const t = setTimeout(() => setIndice((i) => proximo(i)), passo.duracao);
    return () => clearTimeout(t);
  }, [indice, rodada, pausado, passo.duracao]);

  // Fora da tela, para de rodar: economiza bateria e não anima no escuro.
  const [visivel, setVisivel] = useState(true);
  const [raiz, setRaiz] = useState<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!raiz) return;
    const io = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.2 });
    io.observe(raiz);
    return () => io.disconnect();
  }, [raiz]);
  useEffect(() => setPausado(!visivel), [visivel]);

  const irPara = (tela: Tela) => {
    setIndice(indiceDaTela(tela));
    setRodada((r) => r + 1);
  };

  const Tela = { dashboard: Dashboard, contatos: Contatos, conversas: Conversas, agenda: Agenda, empresas: Empresas, funil: Funil, agentes: Agentes }[passo.tela];

  return (
    <div
      ref={setRaiz}
      className="overflow-hidden rounded-panel border border-line bg-canvas shadow-soft"
      aria-label="Simulação do painel do Núcleo i9"
    >
      <div className="flex h-[560px] sm:h-[600px] lg:h-[640px]">
        <nav className="flex w-16 shrink-0 flex-col items-center border-r border-sidebar-line bg-sidebar py-3 text-sidebar-fg sm:w-[88px]" aria-label="Telas do simulador">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white">
            <img src="/marca/nucleo-i9-vertical.svg" alt="" className="h-8 w-auto" />
          </div>
          <ul className="flex w-full flex-col gap-0.5 px-1.5">
            {TELAS.map((t) => {
              const I = ICONES[t.id];
              const ativo = passo.tela === t.id;
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => irPara(t.id)}
                    style={t.id === "agentes" ? { marginTop: 6, borderTop: "1px solid #1b4864", paddingTop: 10 } : undefined}
                    aria-current={ativo ? "true" : undefined}
                    className={`relative flex w-full flex-col items-center gap-1 rounded-xl px-1 py-2 text-[9px] font-medium leading-tight transition-colors sm:text-[10px] ${
                      ativo ? "bg-navy-light text-white" : "hover:bg-navy-light/60 hover:text-white"
                    }`}
                  >
                    <span className={`absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full ${ativo ? "bg-brand-light" : "bg-transparent"}`} />
                    {t.id === "agentes" && <span className="absolute right-2 top-2 size-1.5 rounded-full bg-success" />}
                    <I className={`size-5 ${ativo ? "text-brand-light" : ""}`} />
                    <span className="hidden sm:block">{t.label.replace(" de vendas", "")}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-line bg-white px-4 py-3 sm:px-5">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold tracking-tight text-navy sm:text-lg">{TITULOS[passo.tela].titulo}</h3>
              <p className="hidden truncate text-xs text-muted sm:block">{TITULOS[passo.tela].sub}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden rounded-full bg-chip px-2.5 py-1 text-[11px] font-semibold text-brand sm:inline">Empresa Demonstração</span>
              <span className="flex size-8 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">MA</span>
            </div>
          </header>
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <div key={`${passo.tela}-${rodada}`} className="absolute inset-0 overflow-auto p-3 animate-[simEntra_.45s_ease-out] sm:p-4">
              <Tela />
            </div>
          </div>
          <footer className="flex items-center gap-1.5 border-t border-line bg-white px-4 py-2">
            {PASSOS.map((p, i) => (
              <button
                key={p.tela}
                type="button"
                aria-label={TELAS[i].label}
                onClick={() => irPara(p.tela)}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-line"
              >
                <span
                  key={`${i}-${rodada}-${indice}`}
                  className={`block h-full bg-brand ${i < indice ? "w-full" : i === indice && !pausado ? "animate-[simBarra_linear_forwards]" : "w-0"}`}
                  style={i === indice ? { animationDuration: `${p.duracao}ms` } : undefined}
                />
              </button>
            ))}
          </footer>
        </div>
      </div>
      <style>{`
        @keyframes simEntra { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        @keyframes simBarra { from { width: 0 } to { width: 100% } }
        @keyframes simPulso { 0%,100% { box-shadow: 0 0 0 0 rgba(53,204,98,.6) } 60% { box-shadow: 0 0 0 10px rgba(53,204,98,0) } }
        @keyframes simOnda { 0%,100% { transform: scaleY(.3) } 50% { transform: scaleY(1) } }
        @keyframes simTraco { to { stroke-dashoffset: 0 } }
        @keyframes simToast { from { opacity: 0; transform: translateY(-10px) scale(.96) } to { opacity: 1; transform: none } }
        @keyframes simAlerta { 0%,100% { box-shadow: 0 0 0 0 rgba(220,38,38,.55) } 60% { box-shadow: 0 0 0 8px rgba(220,38,38,0) } }
        @keyframes simConfete { 0% { transform: translate(0,0) rotate(0); opacity: 1 } 100% { transform: translate(var(--dx), var(--dy)) rotate(540deg); opacity: 0 } }
      `}</style>
    </div>
  );
}
