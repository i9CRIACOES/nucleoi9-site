/**
 * Entrega da sessão do site para o painel do cliente.
 *
 * O login acontece em nucleoi9.com.br, mas a sessão do Supabase mora no
 * localStorage de cada origem. Então o site monta o endereço do painel com os
 * tokens no FRAGMENTO (`#access_token=…`), que é o formato que o supabase-js
 * do CRM já lê sozinho no carregamento (`detectSessionInUrl`, fluxo
 * implícito, o mesmo do login com Google). O fragmento não vai para o
 * servidor nem para o Referer.
 */
import { DOMINIO_CLIENTES } from "./config";

export type SessaoMinima = {
  access_token: string;
  refresh_token: string;
  expires_in?: number;
  expires_at?: number;
  token_type?: string;
};

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/;

/** Tira o slug de "clinica", "clinica.nucleoi9.com.br" ou "https://clinica.nucleoi9.com.br/x". */
export function extrairSlug(texto: string): string | null {
  let s = texto.trim().toLowerCase();
  s = s.replace(/^https?:\/\//, "").split("/")[0].split("?")[0];
  const sufixo = `.${DOMINIO_CLIENTES}`;
  if (s.endsWith(sufixo)) s = s.slice(0, -sufixo.length);
  if (s === DOMINIO_CLIENTES || s === "www" || s === "dev" || s === "admin" || s === "api") return null;
  return SLUG_RE.test(s) ? s : null;
}

export function urlDoPainel(slug: string): string {
  return `https://${slug}.${DOMINIO_CLIENTES}/`;
}

export function urlDeEntrega(slug: string, sessao: SessaoMinima): string {
  const p = new URLSearchParams();
  p.set("access_token", sessao.access_token);
  p.set("refresh_token", sessao.refresh_token);
  if (sessao.expires_in != null) p.set("expires_in", String(sessao.expires_in));
  if (sessao.expires_at != null) p.set("expires_at", String(sessao.expires_at));
  p.set("token_type", sessao.token_type ?? "bearer");
  p.set("type", "handoff");
  return `${urlDoPainel(slug)}#${p.toString()}`;
}
