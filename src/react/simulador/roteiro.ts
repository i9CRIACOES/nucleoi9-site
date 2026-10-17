/**
 * O roteiro do simulador: qual tela, por quanto tempo, e a próxima. Puro,
 * para o teste conferir o avanço e o laço sem montar React.
 */
export type Tela = "dashboard" | "contatos" | "conversas" | "agenda" | "empresas" | "funil" | "agentes";

export type Passo = { tela: Tela; duracao: number };

export const PASSOS: Passo[] = [
  { tela: "dashboard", duracao: 6000 },
  // Contatos é mais longa: o Agente iA responde um cliente ao vivo antes do
  // "clique" no WhatsApp que leva para Conversas.
  { tela: "contatos", duracao: 12000 },
  { tela: "conversas", duracao: 7500 },
  // Agenda: reuniões e vendas entrando na semana, uma com conflito conferido.
  { tela: "agenda", duracao: 9500 },
  { tela: "empresas", duracao: 4500 },
  { tela: "funil", duracao: 8000 },
  // Agentes iA: status, três conversas sendo respondidas, desliga e religa.
  { tela: "agentes", duracao: 9500 },
];

export const TELAS: { id: Tela; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "contatos", label: "Contatos" },
  { id: "conversas", label: "Conversas" },
  { id: "agenda", label: "Agenda" },
  { id: "empresas", label: "Empresas" },
  { id: "funil", label: "Funil de vendas" },
  { id: "agentes", label: "Agentes iA" },
];

export function proximo(indice: number): number {
  return (indice + 1) % PASSOS.length;
}

export function indiceDaTela(tela: Tela): number {
  const i = PASSOS.findIndex((p) => p.tela === tela);
  return i < 0 ? 0 : i;
}
