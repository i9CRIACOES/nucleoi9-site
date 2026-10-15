/**
 * Login central em nucleoi9.com.br/entrar. Mesmo projeto Supabase do CRM
 * (produção), senha ou Google. Com a sessão, descobre a empresa da pessoa
 * (`profiles.tenant_id` → `organizacoes.slug`) e a entrega ao painel dela
 * pelo fragmento da URL (ver lib/handoff.ts). Sem empresa ligada, mostra a
 * caixa do endereço da conta.
 */
import { createClient, type Session } from "@supabase/supabase-js";
import { ArrowRight, Eye, EyeOff, Loader2, LogIn } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "../lib/config";
import { ENTRAR as T } from "../lib/conteudo";
import { extrairSlug, urlDeEntrega, urlDoPainel } from "../lib/handoff";

const CHAVE_SLUG = "ni9-ultimo-slug";

type Fase = "verificando" | "pronto" | "entrando" | "entregando" | "sem-conta";

export default function Entrar() {
  const supabase = useMemo(
    () =>
      createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: { persistSession: true, autoRefreshToken: false, detectSessionInUrl: true, flowType: "implicit" },
      }),
    [],
  );

  const [fase, setFase] = useState<Fase>("verificando");
  const [erro, setErro] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(false);
  const [slug, setSlug] = useState("");
  const [mostraEndereco, setMostraEndereco] = useState(false);

  useEffect(() => {
    try {
      setSlug(localStorage.getItem(CHAVE_SLUG) ?? "");
    } catch {
      /* sem storage */
    }
  }, []);

  /** Com a sessão em mãos: acha a empresa e manda para o painel. */
  async function entregar(sessao: Session) {
    setFase("entregando");
    const { data: perfil } = await supabase.from("profiles").select("tenant_id").eq("id", sessao.user.id).maybeSingle();
    const tenantId = (perfil as { tenant_id?: string } | null)?.tenant_id;
    let slugConta: string | null = null;
    if (tenantId) {
      const { data: org } = await supabase.from("organizacoes").select("slug").eq("id", tenantId).maybeSingle();
      slugConta = (org as { slug?: string } | null)?.slug ?? null;
    }
    if (!slugConta) {
      // Sem empresa ligada: tira a sessão do site e deixa a pessoa ir pelo endereço.
      await supabase.auth.signOut({ scope: "local" });
      setFase("sem-conta");
      setMostraEndereco(true);
      return;
    }
    try {
      localStorage.setItem(CHAVE_SLUG, slugConta);
    } catch {
      /* ignora */
    }
    const destino = urlDeEntrega(slugConta, sessao);
    // A sessão vai no fragmento; aqui no site ela não fica. `local` não
    // revoga o refresh token no servidor, então o painel consegue usá-lo.
    await supabase.auth.signOut({ scope: "local" });
    window.location.replace(destino);
  }

  // Volta do Google (tokens no fragmento) ou sessão já existente.
  useEffect(() => {
    let vivo = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!vivo) return;
      if (data.session) void entregar(data.session);
      else setFase("pronto");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((evento, sessao) => {
      if (evento === "SIGNED_IN" && sessao && fase !== "entregando") void entregar(sessao);
    });
    return () => {
      vivo = false;
      sub.subscription.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function entrarComSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro(null);
    setFase("entrando");
    const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password: senha });
    if (error || !data.session) {
      setFase("pronto");
      setErro(error?.message?.toLowerCase().includes("invalid") ? "E-mail ou senha não conferem." : "Não deu para entrar agora. Tente de novo.");
      return;
    }
    await entregar(data.session);
  }

  async function entrarComGoogle() {
    setErro(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/entrar`, queryParams: { prompt: "select_account" } },
    });
    if (error) setErro("Não deu para abrir o Google agora. Tente de novo.");
  }

  function irPeloEndereco(e: React.FormEvent) {
    e.preventDefault();
    const s = extrairSlug(slug);
    if (!s) {
      setErro("Digite o começo do endereço, como suaempresa.nucleoi9.com.br.");
      return;
    }
    try {
      localStorage.setItem(CHAVE_SLUG, s);
    } catch {
      /* ignora */
    }
    window.location.assign(`${urlDoPainel(s)}auth`);
  }

  const ocupado = fase === "verificando" || fase === "entrando" || fase === "entregando";
  const inputCls = "h-12 w-full rounded-xl border border-line bg-white px-3 text-navy outline-none focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <div className="w-full max-w-md rounded-panel border border-line bg-white p-7 shadow-soft sm:p-9">
      <img src="/marca/nucleo-i9-horizontal.svg" alt="Núcleo i9" width="180" height="44" className="h-11 w-auto" />
      <h1 className="garrafal mt-6 text-3xl text-navy">{T.titulo}</h1>
      <p className="mt-2 text-sm text-muted">{T.sub}</p>

      {fase === "verificando" || fase === "entregando" ? (
        <p className="mt-8 flex items-center gap-2 text-sm text-muted">
          <Loader2 className="size-4 animate-spin" /> {fase === "entregando" ? "Abrindo o seu painel…" : "Verificando…"}
        </p>
      ) : (
        <>
          {fase === "sem-conta" && <p className="mt-5 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{T.semConta}</p>}

          {!mostraEndereco && (
            <form onSubmit={entrarComSenha} className="mt-6 flex flex-col gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{T.email}</span>
                <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">{T.senha}</span>
                <span className="relative block">
                  <input type={verSenha ? "text" : "password"} required autoComplete="current-password" value={senha} onChange={(e) => setSenha(e.target.value)} className={`${inputCls} pr-11`} />
                  <button type="button" onClick={() => setVerSenha((v) => !v)} aria-label={verSenha ? "Esconder senha" : "Mostrar senha"} className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted hover:bg-canvas">
                    {verSenha ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </span>
              </label>
              {erro && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{erro}</p>}
              <button type="submit" disabled={ocupado} className="mt-1 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand text-sm font-semibold text-white transition-colors hover:bg-brand-light disabled:opacity-60">
                {fase === "entrando" ? <Loader2 className="size-4 animate-spin" /> : <LogIn className="size-4" />}
                {T.botao}
              </button>
              <div className="my-1 flex items-center gap-3 text-xs text-muted">
                <span className="h-px flex-1 bg-line" />
                {T.ou}
                <span className="h-px flex-1 bg-line" />
              </div>
              <button type="button" onClick={entrarComGoogle} disabled={ocupado} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-line bg-white text-sm font-semibold text-navy transition-colors hover:bg-canvas disabled:opacity-60">
                <svg className="size-4" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.5l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.4 17.7 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z" />
                  <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C1 16.6 0 20.2 0 24s1 7.4 2.6 10.8l7.9-6.1z" />
                  <path fill="#34A853" d="M24 48c6.3 0 11.7-2.1 15.6-5.7l-7.5-5.8c-2.1 1.4-4.8 2.3-8.1 2.3-6.3 0-11.6-3.9-13.5-9.3l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
                </svg>
                {T.google}
              </button>
              <div className="mt-2 flex flex-wrap justify-between gap-2 text-xs">
                <button type="button" onClick={() => { setMostraEndereco(true); setErro(null); }} className="font-semibold text-brand hover:underline">
                  {T.esqueci}
                </button>
                <button type="button" onClick={() => { setMostraEndereco(true); setErro(null); }} className="font-semibold text-brand hover:underline">
                  {T.porEndereco}
                </button>
              </div>
            </form>
          )}

          {mostraEndereco && (
            <form onSubmit={irPeloEndereco} className="mt-6 flex flex-col gap-3">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted">Endereço da sua conta</span>
                <span className="flex items-stretch overflow-hidden rounded-xl border border-line focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/20">
                  <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="suaempresa" autoFocus className="h-12 min-w-0 flex-1 px-3 text-navy outline-none" />
                  <span className="flex items-center bg-canvas px-3 text-sm text-muted">.nucleoi9.com.br</span>
                </span>
                <span className="mt-1 block text-xs text-muted">{T.enderecoAjuda} A recuperação de senha também fica lá.</span>
              </label>
              {erro && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{erro}</p>}
              <button type="submit" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-navy text-sm font-semibold text-white transition-colors hover:bg-navy-light">
                {T.ir} <ArrowRight className="size-4" />
              </button>
              {fase !== "sem-conta" && (
                <button type="button" onClick={() => { setMostraEndereco(false); setErro(null); }} className="text-xs font-semibold text-brand hover:underline">
                  Voltar para e-mail e senha
                </button>
              )}
            </form>
          )}
        </>
      )}

      <a href="/" className="mt-8 block text-center text-xs font-semibold text-muted hover:text-navy">
        ← {T.voltar}
      </a>
    </div>
  );
}
