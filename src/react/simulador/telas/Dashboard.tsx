import { TrendingUp } from "lucide-react";
import { EVOLUCAO_LEADS, KPIS, LEADS_POR_ORIGEM, VENDEDORES, brl } from "../dados";
import { useContador, useDepois } from "../hooks";

function Kpi({ rotulo, valor, formato, delta, atraso }: { rotulo: string; valor: number; formato: "int" | "brl"; delta: string; atraso: number }) {
  const v = useContador(valor, 1500, atraso);
  return (
    <div className="rounded-xl border border-line bg-white p-3 shadow-card">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-muted">{rotulo}</p>
      <p className="mt-1 font-display text-xl font-bold tabular-nums tracking-tight text-navy sm:text-2xl">{formato === "brl" ? brl(v) : v}</p>
      <p className="mt-0.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#1f8f43]">
        <TrendingUp className="size-3" /> {delta}
      </p>
    </div>
  );
}

export function Dashboard() {
  const mostraGraficos = useDepois(500);
  const max = Math.max(...EVOLUCAO_LEADS);
  const w = 320;
  const h = 110;
  const pts = EVOLUCAO_LEADS.map((v, i) => [(i / (EVOLUCAO_LEADS.length - 1)) * w, h - (v / max) * (h - 12)] as const);
  const d = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${d} L${w},${h} L0,${h} Z`;
  const maxOrigem = Math.max(...LEADS_POR_ORIGEM.map((o) => o.valor));

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
        {KPIS.map((k, i) => (
          <Kpi key={k.rotulo} {...k} atraso={i * 120} />
        ))}
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-xl border border-line bg-white p-3 shadow-card">
          <h4 className="text-xs font-semibold text-navy">Evolução de leads</h4>
          <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="simArea" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#0075BE" stopOpacity="0.28" />
                <stop offset="1" stopColor="#0075BE" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[0.25, 0.5, 0.75].map((k) => (
              <line key={k} x1="0" x2={w} y1={h * k} y2={h * k} stroke="#DDE5EC" strokeWidth="1" />
            ))}
            <path d={area} fill="url(#simArea)" style={{ opacity: mostraGraficos ? 1 : 0, transition: "opacity 1.2s ease .6s" }} />
            <path
              d={d}
              fill="none"
              stroke="#0075BE"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              style={{ strokeDasharray: 1, strokeDashoffset: mostraGraficos ? 0 : 1, transition: "stroke-dashoffset 1.6s cubic-bezier(.22,.61,.36,1)" }}
            />
            {mostraGraficos && (
              <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill="#0075BE" stroke="#fff" strokeWidth="2" style={{ animation: "simPulso 1.6s ease-out 1.4s infinite" }} />
            )}
          </svg>
          <div className="mt-1 flex justify-between text-[10px] text-muted">
            <span>1 set</span>
            <span>15 set</span>
            <span>30 set</span>
          </div>
        </div>

        <div className="rounded-xl border border-line bg-white p-3 shadow-card">
          <h4 className="text-xs font-semibold text-navy">Leads por origem</h4>
          <ul className="mt-2 flex flex-col gap-2">
            {LEADS_POR_ORIGEM.map((o, i) => (
              <li key={o.origem} className="text-[11px]">
                <div className="flex justify-between text-navy">
                  <span>{o.origem}</span>
                  <span className="font-semibold tabular-nums">{o.valor}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-canvas">
                  <div
                    className="h-full rounded-full bg-brand"
                    style={{ width: mostraGraficos ? `${(o.valor / maxOrigem) * 100}%` : 0, transition: `width 1s cubic-bezier(.22,.61,.36,1) ${0.2 + i * 0.12}s` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-xl border border-line bg-white p-3 shadow-card">
        <h4 className="text-xs font-semibold text-navy">Desempenho por vendedor</h4>
        <ul className="mt-2 grid gap-2 sm:grid-cols-3">
          {VENDEDORES.map((v, i) => (
            <li key={v.nome} className="flex items-center gap-2 rounded-lg bg-canvas p-2">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: v.cor }}>
                {v.iniciais}
              </span>
              <div className="min-w-0 flex-1 text-[11px]">
                <div className="flex justify-between text-navy">
                  <span className="font-semibold">{v.nome}</span>
                  <span className="tabular-nums">{brl(v.receita)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white">
                  <div className="h-full rounded-full" style={{ background: v.cor, width: mostraGraficos ? `${(v.ganhos / 10) * 100}%` : 0, transition: `width 1s ease ${0.5 + i * 0.15}s` }} />
                </div>
                <p className="mt-0.5 text-muted">{v.ganhos} ganhas no mês</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
