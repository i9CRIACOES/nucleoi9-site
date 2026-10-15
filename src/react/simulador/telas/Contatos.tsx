import { Plus, Search } from "lucide-react";
import { CONTATOS } from "../dados";
import { useDepois } from "../hooks";
import { IconeWhatsapp } from "../IconeWhatsapp";

const COR_TAG: Record<string, string> = {
  Quente: "bg-red-50 text-red-700",
  Novo: "bg-chip text-brand",
  Proposta: "bg-amber-50 text-amber-700",
  Qualificado: "bg-success/15 text-[#1f8f43]",
};

export function Contatos() {
  const destaca = useDepois(2300);
  const clica = useDepois(3600);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <label className="flex h-9 flex-1 items-center gap-2 rounded-full border border-line bg-white px-3 text-xs text-muted">
          <Search className="size-4" />
          Buscar nome, e-mail, telefone
        </label>
        <span className="hidden h-9 items-center rounded-full bg-navy px-3 text-xs font-semibold text-white sm:inline-flex">
          <Plus className="mr-1 size-4" /> Novo contato
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <table className="w-full text-left text-[11px] sm:text-xs">
          <thead className="bg-canvas text-[10px] font-semibold uppercase tracking-wide text-muted">
            <tr>
              <th className="px-3 py-2">Contato</th>
              <th className="hidden px-3 py-2 md:table-cell">Telefone</th>
              <th className="hidden px-3 py-2 sm:table-cell">Origem</th>
              <th className="px-3 py-2">Etapa</th>
              <th className="px-3 py-2 text-right">WhatsApp</th>
            </tr>
          </thead>
          <tbody>
            {CONTATOS.map((c, i) => {
              const alvo = i === 0;
              return (
                <tr
                  key={c.nome}
                  className={`border-t border-line transition-colors ${alvo && destaca ? "bg-chip/60" : ""}`}
                  style={{ animation: `simEntra .4s ease-out ${i * 0.08}s both` }}
                >
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-[10px] font-bold text-white">{c.resp}</span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-navy">{c.nome}</p>
                        <p className="truncate text-muted">{c.empresa}</p>
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-3 py-2.5 text-muted md:table-cell">{c.telefone}</td>
                  <td className="hidden px-3 py-2.5 text-muted sm:table-cell">{c.origem}</td>
                  <td className="px-3 py-2.5">
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${COR_TAG[c.tag] ?? "bg-canvas text-muted"}`}>{c.tag}</span>
                  </td>
                  <td className="px-3 py-2.5 text-right">
                    <span
                      className={`relative inline-flex size-7 items-center justify-center rounded-full text-white transition-transform ${
                        alvo && clica ? "scale-90 bg-[#128C7E]" : "bg-[#25D366]"
                      }`}
                      style={alvo && destaca ? { animation: "simPulso 1.1s ease-out infinite" } : undefined}
                    >
                      <IconeWhatsapp className="size-4" />
                      {alvo && destaca && (
                        <span className="pointer-events-none absolute -left-7 -top-6 select-none text-xl" style={{ animation: "simEntra .3s ease-out" }} aria-hidden="true">
                          👆
                        </span>
                      )}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="text-[11px] text-muted">6 de 1.284 contatos · Clique no WhatsApp e a conversa abre no painel.</p>
    </div>
  );
}
