# nucleoi9.com.br — site do Núcleo i9

Site estático do produto. Astro 7 + React (ilhas) + Tailwind 4 + GSAP.
Spec: `docs/superpowers/specs/2026-10-15-site-nucleoi9-design.md`.

## Rodar

```bash
npm install
npm run dev      # http://localhost:4321 (lista de espera já com proxy)
npm test         # vitest: conteúdo, roteiro do simulador, entrega do login
npm run build    # dist/
npm run og       # regenera public/og.png a partir de scripts/og.html
```

## Onde cada coisa mora

| O quê | Onde |
|---|---|
| Todo o texto do site | `src/lib/conteudo.ts` |
| Cores, fontes, título garrafal | `src/styles/global.css` |
| Seções da home | `src/components/secoes/*.astro` |
| Simulador do CRM (roteiro, dados, telas) | `src/react/simulador/` |
| Animações de rolagem, scrollspy, progresso | `src/scripts/site.ts` |
| Login central | `src/react/Entrar.tsx` + `src/lib/handoff.ts` |
| Lista de espera (modal) | `src/react/ListaDeEspera.tsx` |
| Preloader, hero (multidão), botão magnético | `src/react/` |
| Páginas legais (não mexer: Google e Meta apontam) | `public/privacidade`, `public/termos`, `public/exclusao-de-dados`, `public/politica-de-privacidade` |
| Imagem de compartilhamento | `public/og.png` (gerada por `scripts/og.mjs`) |

## Deploy (automático)

`git push` na `main` → Action "Build e Deploy Site" (testa, builda, publica a
branch `deploy`) → webhook do GitHub → Plesk puxa a `deploy` em
`/var/www/vhosts/nucleoi9.com.br/httpdocs` (repositório `nucleoi9-site`,
modo automático). Nada de `force_orphan`: histórico linear ou o Plesk para de
puxar em silêncio.

Conferir no ar: `curl -sI https://nucleoi9.com.br/og.png` e o `<title>` da home.

## Lista de espera

O modal faz `POST /api/lista-espera` no próprio domínio. O nginx do Plesk
(`/var/www/vhosts/system/nucleoi9.com.br/conf/vhost_nginx.conf`) encaminha para
`https://api.nucleoi9.com.br/api/public/formularios/<id>`: o formulário
"Lista de espera — site" da conta **estudioi9** em produção. O lead cai no CRM
da i9 com origem `form_lista_de_espera_site`; a empresa vai nas observações.
O id está em `src/lib/config.ts` e no `astro.config.mjs` (proxy do dev).

## Entrar (login central)

`/entrar` usa o projeto Supabase de produção (chave anon, pública). Senha ou
Google. Com a sessão, lê `profiles.tenant_id` → `organizacoes.slug` e manda
para `https://<slug>.nucleoi9.com.br/#access_token=…`, que o CRM já lê sozinho.
Sem empresa ligada, mostra a caixa do endereço da conta.

⚠️ Login com Google só funciona depois de adicionar
`https://nucleoi9.com.br/entrar` em **Authentication → URL Configuration →
Redirect URLs** do projeto `CRMi9 - PRODUÇÃO`. Senha funciona sem isso.
