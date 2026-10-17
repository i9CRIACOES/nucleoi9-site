# Seção única: "no automático" + "não perde nenhuma oportunidade"

Data: 17/10/2026. Pedido do Marcelo.

## O que muda

As seções `Automatico` (faixa azul com o Agente iA no piloto automático) e
`Jornada` (linha do tempo das seis fases) viram uma seção só, no lugar onde a
faixa azul está hoje (5ª da página). A seção `Jornada` sai do lugar antigo.

Ordem dentro da seção nova:

1. **Faixa azul** (mantém gradiente, selo "Primeiro atendimento com Agentes iA").
   - "Venda todo dia, no automático" perde destaque: deixa de ser título
     garrafal grande e vira título médio (`clamp(1.5rem, 2.4vw, 2.1rem)`).
   - O parágrafo do agente cai para uma frase.
   - O cartão "Isa | Atendimento" e os seis passos ficam com a mesma animação;
     o texto de cada passo cai para uma linha curta.
   - Botão "Acionar agora" e a nota continuam.
2. **Mensagem-chave**, fundo claro, logo abaixo na mesma seção: selo
   "Automação na prática", título grande "Com o Núcleo i9, você não perde
   nenhuma oportunidade." e a linha do tempo clicável de seis fases, sem
   mudança.

## Âncoras e menu

- `#automatico` continua na seção; `#jornada` passa a ser a parte 2, com
  `scroll-mt` para o menu "Jornada" parar no lugar certo.
- As duas partes levam `data-secao` próprio, para o destaque do menu lateral
  e do quinto botão do celular seguirem funcionando (`automatico` → Agentes iA,
  `jornada` → Jornada).

## Onde mexe

- `src/lib/conteudo.ts`: `AUTOMATICO.sub` e `passos[].texto` encurtados.
- `src/components/secoes/Automatico.astro`: recebe a parte 2.
- `src/components/secoes/Jornada.astro`: removido; `index.astro` deixa de
  chamá-lo.
- `src/lib/conteudo.test.ts`: teste de tamanho dos textos encurtados.

## Pronto quando

`npm run build` e `vitest` passam; capturas antes/depois (desktop e celular)
em `docs/capturas/2026-10-17-secao-junta/`; PR aberto para o Marcelo aprovar.
