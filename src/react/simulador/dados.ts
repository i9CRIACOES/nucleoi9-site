/** Dados fictícios do simulador. Nomes, empresas e valores inventados. */

export const KPIS = [
  { rotulo: "Leads no período", valor: 128, formato: "int", delta: "+18%" },
  { rotulo: "Receita", valor: 86400, formato: "brl", delta: "+24%" },
  { rotulo: "Contratos assinados", valor: 14, formato: "int", delta: "+3" },
  { rotulo: "Oportunidades ganhas", valor: 21, formato: "int", delta: "+5" },
  { rotulo: "Ticket médio", valor: 4114, formato: "brl", delta: "+6%" },
] as const;

export const EVOLUCAO_LEADS = [8, 11, 9, 14, 13, 17, 16, 21, 19, 24, 23, 28];

export const LEADS_POR_ORIGEM = [
  { origem: "WhatsApp", valor: 46 },
  { origem: "Instagram Ads", valor: 31 },
  { origem: "Site", valor: 22 },
  { origem: "Indicação", valor: 17 },
  { origem: "Facebook Ads", valor: 12 },
];

export const VENDEDORES = [
  { nome: "Marina", iniciais: "MA", cor: "#0075BE", ganhos: 9, receita: 31200 },
  { nome: "Rafael", iniciais: "RA", cor: "#35CC62", ganhos: 7, receita: 27900 },
  { nome: "Camila", iniciais: "CA", cor: "#184E6C", ganhos: 5, receita: 27300 },
];

export const CONTATOS = [
  { nome: "Mariana Costa", empresa: "Clínica Viva", telefone: "(11) 98877-1020", origem: "Instagram Ads", resp: "MA", tag: "Quente" },
  { nome: "Roberto Lima", empresa: "Lima Engenharia", telefone: "(19) 99123-4455", origem: "WhatsApp", resp: "RA", tag: "Novo" },
  { nome: "Juliana Prado", empresa: "Prado Contábil", telefone: "(11) 97654-0098", origem: "Site", resp: "CA", tag: "Proposta" },
  { nome: "Bruno Almeida", empresa: "Agro Almeida", telefone: "(16) 98111-2233", origem: "Indicação", resp: "MA", tag: "Qualificado" },
  { nome: "Amanda Ribeiro", empresa: "Studio AR", telefone: "(21) 99888-7766", origem: "Facebook Ads", resp: "RA", tag: "Novo" },
  { nome: "Leonardo Menezes", empresa: "LM Imóveis", telefone: "(31) 98222-3344", origem: "WhatsApp", resp: "CA", tag: "Quente" },
];

export const CONVERSAS_LISTA = [
  { nome: "Mariana Costa", previa: "Fechado! Me manda o Pix", quando: "agora", naoLidas: 1, ativo: true },
  { nome: "Leonardo Menezes", previa: "Quero entender melhor os planos", quando: "2 min", naoLidas: 1 },
  { nome: "Juliana Prado", previa: "Pode me enviar por e-mail?", quando: "8 min", naoLidas: 0 },
  { nome: "Bruno Almeida", previa: "Tenho uma dúvida sobre o contrato", quando: "15 min", naoLidas: 0 },
];

export const THREAD_INICIAL = [
  { de: "eles", tipo: "texto", texto: "Oi! Vi a proposta de vocês. O valor fecha com o plano Professional?", hora: "15:28" },
  { de: "nos", tipo: "texto", texto: "Fecha sim, Mariana. Inclui os Agentes iA e até 10 números. Quer que eu mande o contrato?", hora: "15:29" },
] as const;

export const EMPRESAS = [
  { nome: "Clínica Viva", cnpj: "12.345.678/0001-90", setor: "Clínicas e saúde", contatos: ["MC", "PV", "AL"], oportunidades: [{ titulo: "Plano Professional", valor: 4800, etapa: "Proposta" }, { titulo: "Agentes iA — 2 números", valor: 1200, etapa: "Qualificado" }], ativo: true },
  { nome: "Lima Engenharia", cnpj: "98.765.432/0001-10", setor: "Construtoras", contatos: ["RL", "FS"], oportunidades: [{ titulo: "CRM Essencial", valor: 2400, etapa: "Novo lead" }] },
  { nome: "Prado Contábil", cnpj: "55.444.333/0001-22", setor: "Serviços", contatos: ["JP"], oportunidades: [{ titulo: "Plano Professional", valor: 4800, etapa: "Contato feito" }] },
];

export const LINHA_DO_TEMPO = [
  { quando: "Hoje, 15:29", texto: "Mensagem enviada no WhatsApp por Marina" },
  { quando: "Ontem, 10:12", texto: "Proposta enviada · R$ 4.800" },
  { quando: "Seg, 09:40", texto: "Lead recebido do Instagram Ads" },
];

export type Etapa = "novo" | "contato" | "qualificado" | "proposta" | "ganha";

export const ETAPAS: { id: Etapa; nome: string; prob: string }[] = [
  { id: "novo", nome: "Novo lead", prob: "10%" },
  { id: "contato", nome: "Contato feito", prob: "25%" },
  { id: "qualificado", nome: "Qualificado", prob: "50%" },
  { id: "proposta", nome: "Proposta", prob: "70%" },
  { id: "ganha", nome: "Ganha", prob: "100%" },
];

export type Oportunidade = { id: string; titulo: string; contato: string; valor: number; etapa: Etapa; origem: string };

export const OPORTUNIDADES_INICIAIS: Oportunidade[] = [
  { id: "o1", titulo: "CRM Essencial", contato: "Roberto Lima", valor: 2400, etapa: "novo", origem: "WhatsApp" },
  { id: "o2", titulo: "Site + CRM", contato: "Amanda Ribeiro", valor: 6900, etapa: "novo", origem: "Facebook Ads" },
  { id: "o3", titulo: "Plano Professional", contato: "Juliana Prado", valor: 4800, etapa: "contato", origem: "Site" },
  { id: "o4", titulo: "Agentes iA", contato: "Bruno Almeida", valor: 1200, etapa: "qualificado", origem: "Indicação" },
  { id: "o5", titulo: "Plano Professional", contato: "Mariana Costa", valor: 4800, etapa: "proposta", origem: "Instagram Ads" },
  { id: "o6", titulo: "Sob medida", contato: "Leonardo Menezes", valor: 12000, etapa: "qualificado", origem: "WhatsApp" },
  { id: "o7", titulo: "CRM Essencial", contato: "Studio AR", valor: 2400, etapa: "ganha", origem: "Instagram Ads" },
];

/** Os movimentos do funil, em ms depois de a tela montar. */
export const MOVIMENTOS: { em: number; id: string; para: Etapa }[] = [
  { em: 1400, id: "o1", para: "contato" },
  { em: 2900, id: "o6", para: "proposta" },
  { em: 4400, id: "o3", para: "qualificado" },
  { em: 5600, id: "o5", para: "ganha" },
];

export const brl = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
