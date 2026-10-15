/**
 * O modal da lista de espera. Uma ilha só, montada uma vez; qualquer botão
 * com `data-acionar` na página abre. Nunca mostra valor.
 *
 * O envio vai para `/api/lista-espera` no próprio domínio: o nginx (em
 * produção) e o Vite (em desenvolvimento) encaminham para o formulário
 * público do CRM, que cria o lead na conta estudioi9.
 */
import { X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { LISTA_ESPERA_PATH } from "../lib/config";
import { LISTA_ESPERA as T } from "../lib/conteudo";

type Estado = "fechado" | "aberto" | "enviando" | "sucesso" | "erro";

export default function ListaDeEspera() {
  const [estado, setEstado] = useState<Estado>("fechado");
  const [plano, setPlano] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const primeiro = useRef<HTMLInputElement>(null);

  const abrir = useCallback((p: string | null) => {
    setPlano(p);
    setErro(null);
    setEstado("aberto");
  }, []);
  const fechar = useCallback(() => setEstado("fechado"), []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const alvo = (e.target as HTMLElement).closest<HTMLElement>("[data-acionar]");
      if (!alvo) return;
      e.preventDefault();
      abrir(alvo.dataset.plano ?? null);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [abrir]);

  useEffect(() => {
    if (estado === "fechado") return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    primeiro.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [estado, fechar]);

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const corpo = {
      nome: String(fd.get("nome") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      consentimento: fd.get("consentimento") === "on",
      respostas: {
        empresa: String(fd.get("empresa") ?? "").trim(),
        ...(plano ? { plano_interesse: plano } : {}),
      },
      utm_source: new URLSearchParams(location.search).get("utm_source"),
      utm_medium: new URLSearchParams(location.search).get("utm_medium"),
      utm_campaign: new URLSearchParams(location.search).get("utm_campaign"),
    };
    setEstado("enviando");
    setErro(null);
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 20000);
      const r = await fetch(LISTA_ESPERA_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(corpo),
        signal: ctrl.signal,
      });
      clearTimeout(t);
      const j = (await r.json().catch(() => null)) as { ok?: boolean; mensagem?: string } | null;
      if (!r.ok || !j?.ok) throw new Error(j?.mensagem || T.erro);
      setEstado("sucesso");
    } catch (err) {
      setErro(err instanceof Error && err.message ? err.message : T.erro);
      setEstado("erro");
    }
  }

  if (estado === "fechado") return null;

  const ocupado = estado === "enviando";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-navy-ink/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="lista-titulo"
      onMouseDown={(e) => e.target === e.currentTarget && fechar()}
    >
      <div className="w-full max-w-md rounded-t-panel bg-white p-6 shadow-soft sm:rounded-panel sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="lista-titulo" className="garrafal text-2xl text-navy">
              {T.titulo}
            </h2>
            <p className="mt-1 text-sm text-muted">{T.sub}</p>
            {plano && (
              <p className="mt-2 inline-flex rounded-full bg-chip px-2.5 py-0.5 text-xs font-semibold text-brand">Plano {plano}</p>
            )}
          </div>
          <button type="button" onClick={fechar} aria-label="Fechar" className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-canvas">
            <X className="size-5" />
          </button>
        </div>

        {estado === "sucesso" ? (
          <div className="rounded-card bg-success/10 p-5 text-center">
            <p className="font-semibold text-[#1f8f43]">{T.sucesso}</p>
            <button type="button" onClick={fechar} className="mt-4 inline-flex h-11 items-center rounded-xl bg-navy px-5 text-sm font-semibold text-white">
              Fechar
            </button>
          </div>
        ) : (
          <form onSubmit={enviar} className="flex flex-col gap-3">
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{T.campos.nome}</span>
              <input ref={primeiro} name="nome" required minLength={2} maxLength={160} autoComplete="name" className="h-11 w-full rounded-xl border border-line px-3 text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{T.campos.email}</span>
              <input name="email" type="email" required maxLength={200} autoComplete="email" className="h-11 w-full rounded-xl border border-line px-3 text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{T.campos.empresa}</span>
              <input name="empresa" required minLength={2} maxLength={160} autoComplete="organization" className="h-11 w-full rounded-xl border border-line px-3 text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20" />
            </label>
            <label className="mt-1 flex items-start gap-2 text-xs text-muted">
              <input name="consentimento" type="checkbox" required className="mt-0.5 size-4 accent-brand" />
              <span>
                {T.consentimento}{" "}
                <a href="/privacidade/" target="_blank" rel="noopener" className="font-semibold text-brand underline">
                  Ler a política
                </a>
              </span>
            </label>
            {erro && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{erro}</p>}
            <button type="submit" disabled={ocupado} className="mt-2 inline-flex h-12 items-center justify-center rounded-xl bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-60">
              {ocupado ? T.enviando : T.botao}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
