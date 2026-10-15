# Plano de implementação — site nucleoi9.com.br

Spec: `docs/superpowers/specs/2026-10-15-site-nucleoi9-design.md`.
Cada passo termina com algo verificável. Ordem pensada para o site ficar
navegável cedo e as partes de risco (login, lista de espera, deploy) ficarem
isoladas.

## 1. Base
- [ ] `src/styles/global.css`: tokens do CRM em `@theme`, fontes @fontsource,
      utilitários de título garrafal, `prefers-reduced-motion`.
- [ ] `src/layouts/Base.astro`: head completo (title, description, canonical,
      OG/Twitter, favicon, theme-color), fontes, `global.css`.
- [ ] `src/lib/conteudo.ts`: TODO o texto do site num arquivo só (seções,
      itens, FAQ, planos, logos). Teste: vitest confere que não há item vazio
      e que todo logo listado existe em `public/`.
- [ ] `public/`: logos, selos, marca (feito), páginas legais copiadas.

## 2. Casca
- [ ] `MenuLateral.astro` + `menu.ts` (scrollspy + progresso, vanilla).
- [ ] `BarraTopo.astro` (logo, Entrar, Acionar agora) e `BarraMobile.astro`.
- [ ] `Rodape.astro`.
- [ ] Página `index.astro` com as 14 seções como componentes `.astro`
      estáticos (texto real, sem animação ainda). Verificar: build passa,
      HTML tem todas as âncoras do menu.

## 3. Simulador do CRM (ilha React)
- [ ] `Simulador.tsx` + `simulador/dados.ts` (fictícios) + telas:
      `Dashboard`, `Contatos`, `Conversas`, `Empresas`, `Funil`.
- [ ] `roteiro.ts`: máquina de passos (tela, duração, ação) com teste vitest
      do avanço e do loop. Clique no menu interno pula para a tela.
- [ ] Animações internas (contador, gráfico SVG, digitando, card trocando de
      coluna, Ganha).

## 4. Hero, botão magnético, preloader
- [ ] `CrowdCanvas.tsx` (adaptado, sprite local em `public/hero/peeps.png`).
- [ ] `BotaoMagnetico.tsx` (partículas nas cores da marca).
- [ ] `Preloader.tsx` (weight sweep, 1,6 s, sessionStorage, reduced-motion).

## 5. Animações de rolagem
- [ ] `src/lib/animacoes.ts`: GSAP + ScrollTrigger, registro único; título
      por linha, stagger de cartões, contadores das estatísticas.

## 6. Entrar e Acionar agora
- [ ] `src/pages/entrar.astro` + `Entrar.tsx` (supabase-js, senha + Google,
      slug fallback). `handoff.ts` monta a URL de entrega; teste vitest.
- [ ] `ListaDeEspera.tsx` (modal) → `POST /api/lista-espera`.
- [ ] Formulário criado em produção (estudioi9); id em `src/lib/config.ts`.
- [ ] nginx: `location /api/lista-espera` → proxy para a API do CRM.

## 7. OG e SEO
- [ ] `scripts/og.ts` gera `public/og.png` via Playwright.
- [ ] `robots.txt`, `sitemap` simples, `<meta>` conferidos.

## 8. Verificação
- [ ] Playwright: abre a home, confere menu, abas do simulador, modal, página
      /entrar; screenshots desktop e mobile.
- [ ] Lighthouse mobile.

## 9. Deploy
- [ ] Repo GitHub `nucleoi9-site`, Action build → branch `deploy`, repositório
      Git no Plesk em `httpdocs`, webhook. Conferir as 4 páginas legais no ar.
