import { Building2, FileSignature, Plus } from "lucide-react";
import { EMPRESAS, LINHA_DO_TEMPO, brl } from "../dados";
import { useDepois } from "../hooks";

export function Empresas() {
  const detalhe = useDepois(600);
  const ativa = EMPRESAS[0];

  return (
    <div className="grid h-full gap-3 md:grid-cols-[220px_1fr]">
      <aside className="flex flex-col gap-2">
        <span className="inline-flex h-9 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
          <Plus className="mr-1 size-4" /> Nova empresa
        </span>
        <ul className="flex flex-col gap-1.5">
          {EMPRESAS.map((e, i) => (
            <li
              key={e.nome}
              className={`flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-card ${e.ativo ? "border-brand ring-2 ring-brand/15" : "border-line"}`}
              style={{ animation: `simEntra .4s ease-out ${i * 0.1}s both` }}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-chip text-brand">
                <Building2 className="size-4" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[12px] font-semibold text-navy">{e.nome}</p>
                <p className="truncate text-[10px] text-muted">{e.setor}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside>

      <section className="rounded-xl border border-line bg-white p-4 shadow-card" style={{ opacity: detalhe ? 1 : 0, transform: detalhe ? "none" : "translateY(8px)", transition: "all .5s ease" }}>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <h4 className="text-base font-semibold tracking-tight text-navy">{ativa.nome}</h4>
            <p className="text-[11px] text-muted">CNPJ {ativa.cnpj} · {ativa.setor}</p>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-1 text-[10px] font-semibold text-[#1f8f43]">
            <FileSignature className="size-3" /> Contrato ativo
          </span>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-wide text-muted">Contatos vinculados</h5>
            <div className="mt-2 flex items-center">
              {ativa.contatos.map((c, i) => (
                <span key={c} className="-ml-1.5 flex size-8 items-center justify-center rounded-full border-2 border-white bg-navy text-[10px] font-bold text-white first:ml-0" style={{ zIndex: 10 - i }}>
                  {c}
                </span>
              ))}
              <span className="ml-2 text-[11px] text-muted">{ativa.contatos.length} pessoas</span>
            </div>

            <h5 className="mt-4 text-[10px] font-semibold uppercase tracking-wide text-muted">Oportunidades</h5>
            <ul className="mt-2 flex flex-col gap-1.5">
              {ativa.oportunidades.map((o, i) => (
                <li key={o.titulo} className="flex items-center justify-between rounded-lg bg-canvas px-3 py-2 text-[11px]" style={{ animation: `simEntra .4s ease-out ${0.4 + i * 0.15}s both` }}>
                  <div>
                    <p className="font-semibold text-navy">{o.titulo}</p>
                    <p className="text-muted">{o.etapa}</p>
                  </div>
                  <span className="font-semibold tabular-nums text-navy">{brl(o.valor)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] font-semibold uppercase tracking-wide text-muted">Histórico</h5>
            <ol className="relative mt-2 flex flex-col gap-3 border-l border-line pl-4">
              {LINHA_DO_TEMPO.map((l, i) => (
                <li key={l.texto} className="relative text-[11px]" style={{ animation: `simEntra .4s ease-out ${0.6 + i * 0.2}s both` }}>
                  <span className="absolute -left-[21px] top-1 size-2.5 rounded-full border-2 border-white bg-brand" />
                  <p className="text-muted">{l.quando}</p>
                  <p className="font-medium text-navy">{l.texto}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
