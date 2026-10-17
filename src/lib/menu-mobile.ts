/**
 * A barra inferior do celular: quatro atalhos fixos e um quinto lugar
 * "inteligente", que mostra a seção em que a pessoa está quando ela não é
 * um dos quatro, e abre a folha com todas as seções. Puro, para o teste.
 */
import { MENU, type ItemMenu } from "./conteudo";

/** Os atalhos que ficam sempre na barra. */
export const FIXOS = ["inicio", "painel", "solucoes", "planos"] as const;

/**
 * Seções da página que não estão no menu, ligadas ao item do menu mais
 * próximo. Assim o destaque da barra e do menu lateral nunca some.
 */
export const SECAO_PARA_MENU: Record<string, string> = {
  ideal: "solucoes",
  automatico: "agentes",
  comparativo: "planos",
  "como-comeca": "planos",
  clientes: "i9",
  cta: "planos",
};

export function itemDoMenu(secao: string): string {
  if (MENU.some((m) => m.id === secao)) return secao;
  return SECAO_PARA_MENU[secao] ?? "";
}

export type EstadoDoQuinto = { item: ItemMenu | null; ativo: boolean };

/**
 * O que o quinto botão mostra: a seção atual (acesa) quando ela não é um
 * dos fixos; senão, "Mais", apagado.
 */
export function quintoBotao(secao: string): EstadoDoQuinto {
  const id = itemDoMenu(secao);
  if (!id || (FIXOS as readonly string[]).includes(id)) return { item: null, ativo: false };
  const item = MENU.find((m) => m.id === id) ?? null;
  return { item, ativo: item !== null };
}

/**
 * Esconder ou mostrar as barras conforme a rolagem: some descendo, volta
 * subindo, e perto do topo fica sempre à vista. `delta` é o quanto rolou
 * desde a última medição.
 */
export function barraEscondida(y: number, delta: number, antes: boolean): boolean {
  if (y < 120) return false;
  if (Math.abs(delta) < 8) return antes;
  return delta > 0;
}
