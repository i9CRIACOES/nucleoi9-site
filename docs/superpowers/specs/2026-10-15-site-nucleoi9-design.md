# Site do Núcleo i9 (nucleoi9.com.br) — design

Data: 15/10/2026. Aprovado pelo Marcelo em conversa (respostas às 7 dúvidas).

## Objetivo

Substituir o hot site "em construção" de `nucleoi9.com.br` por uma landing page
completa do produto, com visual limpo nas cores do CRM, letras garrafais,
animações de rolagem e uma simulação viva do painel do CRM. O site vende o
Núcleo i9 como **núcleo de soluções**: tudo que a equipe de vendas precisa, num
lugar só, integrado ao que ela já usa (WhatsApp com API oficial, Meta,
assinatura de contrato, formulários, campanhas, relatórios).

Público: dono de negócio e gestor comercial, não programador.

## O que NÃO muda

- `/privacidade/`, `/termos/`, `/exclusao-de-dados/`, `/politica-de-privacidade/`
  continuam exatamente como estão (Google e Meta apontam para elas). Os quatro
  `index.html` entram no repositório em `public/` para o deploy nunca apagá-los.
- O CRM (repositório CRMi9) não é alterado. Tudo que o site precisa do CRM já
  existe: login Supabase (senha e Google), `profiles.tenant_id` →
  `organizacoes.slug`, endpoint público de formulário.

## Onde mora

- Repositório próprio: `~/Claude/CLAUDE CODE/nucleoi9-site/` → GitHub
  `nucleoi9-site`.
- Deploy: GitHub Action faz `astro build` e publica a pasta `dist/` na branch
  `deploy`; webhook do Plesk puxa para `httpdocs` de `nucleoi9.com.br`.
  (Padrão da skill `deploy-git-plesk`, sem `force_orphan`.)

## Stack

| Peça | Escolha | Por quê |
|---|---|---|
| Framework | Astro 7 + React (ilhas) | HTML estático no build (SEO, OG), JavaScript só onde anima |
| Estilo | Tailwind 4 (`@tailwindcss/vite`) | mesmo tokens do CRM, em CSS vars |
| Animação | GSAP + ScrollTrigger | rolagem, números subindo, troca de etapa no funil |
| Ícones | lucide-react | os mesmos do CRM |
| Fontes | Inter Tight (títulos, variável) + Inter (texto), via @fontsource | títulos garrafais; a variável serve ao preloader |
| Login | @supabase/supabase-js (projeto de produção, chave anon) | mesmo login do CRM |
| Teste | vitest (helpers puros) + Playwright (fumaça visual) | |

## Identidade

- Cores (do `styles.css` do CRM): azul `#0075BE`, azul claro `#2790D2`, navy
  `#0F3349`, navy claro `#184E6C`, verde `#35CC62`, fundo `#F4F7FA`, texto
  `#16232E`, borda `#DDE5EC`. Logo: `#00649B`.
- Logo horizontal (`HORIZONTAL.svg`) no topo e no OG; vertical (`VERTICAL.svg`)
  no preloader e no rodapé. Fundo branco arredondado quando sobre navy.
- Nome: **Núcleo i9** (o logo diz nucleoi9). "Nucleo9" da fala = Núcleo i9.
- Tom: frases curtas, garrafais, sem jargão. Destaque recorrente: **só usamos a
  API oficial do WhatsApp**.

## Layout

- **Menu lateral fixo** (desktop, ≥1024px), espelho da barra do CRM: ícone +
  rótulo, item ativo com a mesma barrinha azul à esquerda. Itens: Início,
  Painel, Soluções, Agentes iA, No bolso, Benefícios, Planos, i9, FAQ.
  Scrollspy marca a seção visível; barra de progresso de rolagem fina no topo.
- Mobile: cabeçalho com logo + botão Entrar; barra inferior com 5 atalhos.
- Botões fixos no topo direito: **Entrar** (fantasma) e **Acionar agora**
  (azul, com efeito magnético de partículas).

## Seções (ordem)

1. **Hero**: "TUDO QUE SEU NEGÓCIO PRECISA, INTEGRADO COM O QUE VOCÊ USA NO DIA
   A DIA". Subtítulo: núcleo de soluções que integra o WhatsApp, organiza
   oportunidades, traz o histórico de contatos e empresas e cria oportunidades.
   A melhor opção para quem quer crescer com responsabilidade. Pílulas: acesso
   em minutos · usuários ilimitados · sem fidelidade · só API oficial. Botões
   Entrar / Acionar agora. Fundo: canvas de pessoas caminhando (Open Peeps,
   sprite hospedado localmente), tingido em navy/azul.
2. **Simulador do CRM** (ilha React): moldura igual ao painel real (barra
   lateral navy, cabeçalho, fundo claro). Roteiro automático em loop, também
   clicável: Dashboard (5 KPIs com números subindo, gráfico de evolução de
   leads e barras por origem, desempenho por vendedor) → Contatos (lista com
   busca, tags, responsável; destaque no botão WhatsApp) → Conversas (lista à
   esquerda, thread com mensagem chegando, "digitando…", áudio com onda, vídeo,
   caixa de resposta) → Empresas (cadastro com contatos vinculados e
   oportunidades) → Funil (colunas Novo lead → Contato feito → Qualificado →
   Proposta → Ganha; cards mudam de etapa sozinhos, um fecha como **Ganha**
   com confete discreto e os totais de cada coluna recalculam).
   Dados fictícios (nomes, empresas, valores).
3. **Núcleo de soluções: tudo que você precisa** (12 cartões): CRM · Funil de
   vendas personalizado · WhatsApp com os números da sua empresa (destaque:
   apenas API oficial) · Agentes iA treinados para responder pela sua empresa
   · Assinatura de contratos · Integração com a Meta · Formulários · Campanhas
   personalizadas · Relatórios e dashboards · Usuários ilimitados · Histórico
   de contatos e empresas · Equipe e permissões.
4. **Núcleo i9 é ideal para** (6 itens do Marcelo): quem não quer deixar
   contato sem resposta · quem precisa colocar a equipe · quem quer o histórico
   do trabalho registrado · quem quer menos ferramentas e mais resultado · quem
   quer os números compilados · quem quer resolver e trazer informação
   importante. Frase de apoio: "Sua equipe de vendas precisa de uma solução
   simples que funciona e um custo que cabe no orçamento."
5. **Agentes iA** (seção inteira): atendem, entendem, conversam, agendam e
   fecham negócios. A IA assume o primeiro contato. Liga e desliga quando
   quiser. Transfere para a equipe de vendas. Responde em segundos, alerta 24
   horas por dia, aprende constantemente. Mockup de conversa animada.
6. **CRM de bolso**: versão compacta para acessar de qualquer lugar; a equipe
   resolve e entende tudo o que precisa; perfeito para home office. Mockup de
   celular com notificações entrando.
7. **Benefícios para o seu negócio** (adaptado do site da Alisson, 14 cartões
   com ícone lucide): Informa · Poupa tempo · Simplifica · Receita adicional ·
   Reduz riscos · Organiza · Integra · Conecta · Reduz esforço · Evita
   complicação · Reduz custos · Qualidade · Variedade · Experiência de uso.
8. **Troque várias assinaturas por uma** (tabela, sem valores): CRM e gestão
   de pipeline (RD Station) · Funis de vendas ilimitados (ClickFunnels) ·
   Relatórios e dashboards (Looker Studio Pro) · Automação em grupos de
   WhatsApp (BotConversa) · Assinatura de documento e envio de proposta
   (Clicksign) · Agentes de IA de mensagem (Blip) · Inteligências artificiais
   (Anthropic, ChatGPT) · Usuários ilimitados (cobrado por assento) → todos
   "Incluso". Rodapé da tabela: risco zero · satisfação garantida · sem
   fidelidade.
9. **Planos** (sem preço, três cartões):
   - **Essencial**: CRM completo · pipeline personalizado · usuários e contas
     individuais ilimitados · WhatsApp com API oficial ilimitado.
   - **Professional** (mais escolhido): tudo do Essencial · criação de Agentes
     iA · até 10 números de WhatsApp.
   - **Sob medida**: tudo do Professional · módulos customizados para a sua
     empresa · valor a combinar.
   Botão em todos: Acionar agora.
10. **Como começa**: De acordo → acesso liberado em minutos → você monta sua
    equipe → sistema simples, descomplicado, já funcionando.
11. **Quem faz**: i9 Criações, agência digital com mais de 20 anos. 20+ anos ·
    500+ projetos · 200+ marcas. "Experiência e criatividade não são mais o
    diferencial de uma agência. Orçamento e resultado são. Por isso entendemos,
    com a experiência do mercado e dos nossos clientes, o que você precisa."
    Setores: Agronegócio · Clínicas e saúde · Serviços financeiros ·
    Construtoras e imobiliárias · Educação e cursos · Varejo e e-commerce ·
    Automotivo · Empresas B2B · Serviços · Empresas B2C. Certificações em
    faixa valorizada: Google Partner · Google Analytics · Facebook Marketing
    Partner · LinkedIn Marketing Partner · ABMRA · SharpSpring · HubSpot
    Partner · RD Station Partner.
12. **Clientes**: "Clientes parceiros, projetos e desafios que nos ajudaram a
    entender que menos é mais: o simples que resolve." 22 logos (BASF,
    Corinthians, CPS, Crefisa, Dow, DSM, EcoRodovias, EMS, FESPSP, FIDI, Flint
    Group, Grupo RBS, GVT, Honda, Huawei, Ihara, InterSystems, Kraft Foods, Leo
    Madeiras, LG, África, …) em grade cinza que colore no hover.
13. **FAQ** (acordeão): planos, fidelidade, API oficial x QR Code (só oficial,
    por quê), usuários, precisa de tecnologia?, suporte, celular, integrações,
    o que acontece ao acionar, dados e LGPD.
14. **CTA final** + rodapé: logo vertical, i9 Criações, links legais, e-mail.

## Entrar (login central)

Página `/entrar`, ilha React, mesmo visual da tela de login do CRM com o logo
do Núcleo i9. Campos e-mail + senha, "Continuar com o Google", "esqueci a
senha" (manda para a recuperação do Supabase).

Fluxo:
1. `signInWithPassword` ou `signInWithOAuth({provider:'google', redirectTo:
   'https://nucleoi9.com.br/entrar'})` no projeto de produção.
2. Com sessão: lê `profiles.tenant_id` → `organizacoes.slug` (as mesmas
   consultas que o CRM faz, sob RLS do próprio usuário).
3. Redireciona para `https://<slug>.nucleoi9.com.br/#access_token=…&refresh_token=…&expires_in=…&token_type=bearer`,
   o formato que o supabase-js do CRM já lê sozinho (`detectSessionInUrl`,
   fluxo implícito, o mesmo do login com Google). Antes de sair, `signOut({
   scope: 'local' })` para a sessão não ficar no domínio do site sem revogar o
   token entregue.
4. Sem conta vinculada: mensagem e a caixa "endereço da sua conta"
   (`[slug].nucleoi9.com.br`) como alternativa, que lembra o último slug.

Pré-requisito fora do código (Marcelo, painel do Supabase de produção →
Authentication → URL Configuration): adicionar `https://nucleoi9.com.br/entrar`
em Redirect URLs. Sem isso, só o login com senha funciona no site.

## Acionar agora (lista de espera)

Modal com nome, e-mail, empresa e o aceite de privacidade. Texto: "Entre na
lista de espera. A gente te chama para ligar o seu Núcleo i9." Nunca mostra
valor.

Envio: `POST /api/lista-espera` no próprio domínio, que o nginx do Plesk
encaminha para `https://api.nucleoi9.com.br/api/public/formularios/<id>`
(o CRM não libera CORS, e o proxy evita mexer nele). O formulário "Lista de
espera — site" existe na conta **estudioi9** em produção, com o campo
`empresa`; o lead cai no CRM da i9 com origem `form_lista_de_espera_site`.

## Compartilhamento (OG)

`public/og.png` 1200×630: fundo navy, logo horizontal em cartão branco,
título "Núcleo i9 — tudo que sua equipe de vendas precisa, num lugar só",
subtítulo com WhatsApp oficial · CRM · Agentes iA. Gerado por script
(`scripts/og.ts`, Playwright renderiza `src/og/og.html`). Metas `og:*` e
`twitter:*` no layout, `og:image:width/height`, `twitter:card =
summary_large_image`. Título e descrição também em `<title>` e
`<meta name="description">`.

## Preloader

Primeira visita da sessão (`sessionStorage`): contador 000→100 em Inter Tight
com o peso subindo (hairline → black), régua de ticks, frase final "Tudo num
só lugar." sobre painel navy que levanta e revela o hero. 1,6 s no total;
`prefers-reduced-motion` pula direto.

## Animações

- Entrada de seção: título sobe com `clip-path` por linha; cartões em stagger.
- Números: contam ao entrar na tela (uma vez).
- Funil: cards trocam de coluna por `Flip`-like (posição calculada), sem
  plugin pago.
- Menu lateral: scrollspy via `ScrollTrigger` por seção.
- Tudo respeita `prefers-reduced-motion`.

## Fora do escopo

Blog, páginas internas por recurso, i18n, dark mode, preço.

## Critérios de pronto

- `astro build` sem erro; Lighthouse mobile ≥ 90 em performance e SEO.
- As quatro páginas legais continuam respondendo 200 no mesmo endereço.
- Login com senha no site leva ao painel do cliente; Google depende da
  Redirect URL acima.
- Lista de espera cria lead em estudioi9 (testado com um lead e apagado).
- OG renderiza no depurador do WhatsApp/Facebook com imagem, título e
  descrição.
