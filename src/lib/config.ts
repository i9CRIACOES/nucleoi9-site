/**
 * O que o site precisa saber de fora dele. Tudo público: a chave anon do
 * Supabase já viaja no bundle do CRM, e o id do formulário é o mesmo que
 * aparece no endereço público dele.
 */
export const SITE_URL = "https://nucleoi9.com.br";
export const DOMINIO_CLIENTES = "nucleoi9.com.br";

/** Projeto CRMi9 - PRODUÇÃO: o mesmo banco de todos os clientes. */
export const SUPABASE_URL = "https://vlefjonkoqopiqsroywk.supabase.co";
export const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsZWZqb25rb3FvcGlxc3JveXdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkxNDY1MTUsImV4cCI6MjEwNDcyMjUxNX0.7d0afKkyiySuq7OIHvCB5XIKDEKVytMKRlsGlid6bRc";

/**
 * Lista de espera: o nginx do Plesk encaminha este caminho para
 * `https://api.nucleoi9.com.br/api/public/formularios/<id>` (o formulário
 * "Lista de espera — site" da conta estudioi9). Em desenvolvimento o Vite faz
 * o mesmo proxy (astro.config.mjs).
 */
export const LISTA_ESPERA_PATH = "/api/lista-espera";
/** Id do formulário "Lista de espera — site" (conta estudioi9, produção). */
export const LISTA_ESPERA_FORM_ID = "4d7277ac-a36d-48b9-b4b8-f7ef6fcbdd75";
export const LISTA_ESPERA_API = `https://api.${DOMINIO_CLIENTES}/api/public/formularios/${LISTA_ESPERA_FORM_ID}`;

export const EMAIL_CONTATO = "contato@nucleoi9.com.br";
