/**
 * O roteiro do simulador: qual tela, por quanto tempo, e a próxima. Puro,
 * para o teste conferir o avanço e o laço sem montar React.
 */
export type Tela = "dashboard" | "contatos" | "conversas" | "empresas" | "funil";

export type Passo = { tela: Tela; duracao: number };

export const PASSOS: Passo[] = [
  { tela: "dashboard", duracao: 6000 },
  { tela: "contatos", duracao: 4200 },
  { tela: "conversas", duracao: 7500 },
  { tela: "empresas", duracao: 4500 },
  { tela: "funil", duracao: 8000 },
];

export const TELAS: { id: Tela; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "contatos", label: "Contatos" },
  { id: "conversas", label: "Conversas" },
  { id: "empresas", label: "Empresas" },
  { id: "funil", label: "Funil de vendas" },
];

export function proximo(indice: number): number {
  return (indice + 1) % PASSOS.length;
}

export function indiceDaTela(tela: Tela): number {
  const i = PASSOS.findIndex((p) => p.tela === tela);
  return i < 0 ? 0 : i;
}
