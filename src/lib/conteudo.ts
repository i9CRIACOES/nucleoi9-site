/**
 * Todo o texto do site num lugar só. Quem quiser trocar uma frase mexe aqui,
 * não no componente. Os ícones são nomes do lucide-react, resolvidos no
 * componente que desenha.
 */

export const SITE = {
  nome: "Núcleo i9",
  titulo: "Núcleo i9 — tudo que sua equipe de vendas precisa, num lugar só",
  descricao:
    "CRM com WhatsApp pela API oficial, funil de vendas, Agentes iA, contratos e relatórios. Acesso em minutos, usuários ilimitados, sem fidelidade.",
  ogTitulo: "Núcleo i9 — tudo num lugar só",
  ogDescricao:
    "WhatsApp oficial, CRM, funil, Agentes iA e contratos. Acesso em minutos, usuários ilimitados, sem fidelidade.",
};

export type ItemMenu = { id: string; label: string; icone: string };

/** Espelho da barra lateral do CRM: ícone + rótulo curto. */
export const MENU: ItemMenu[] = [
  { id: "inicio", label: "Início", icone: "Home" },
  { id: "painel", label: "Painel", icone: "LayoutDashboard" },
  { id: "solucoes", label: "Soluções", icone: "Boxes" },
  { id: "agentes", label: "Agentes iA", icone: "Bot" },
  { id: "memoria", label: "Memória", icone: "BrainCircuit" },
  { id: "jornada", label: "Jornada", icone: "Workflow" },
  { id: "bolso", label: "No bolso", icone: "Smartphone" },
  { id: "beneficios", label: "Benefícios", icone: "Sparkles" },
  { id: "planos", label: "Planos", icone: "CreditCard" },
  { id: "i9", label: "i9", icone: "Award" },
  { id: "faq", label: "FAQ", icone: "CircleHelp" },
];

export const HERO = {
  selo: "Núcleo de soluções para quem vende todo dia",
  titulo: ["Tudo que seu negócio precisa,", "integrado com o que você", "usa no dia a dia."],
  sub: "Somos o núcleo de soluções que todo cliente precisa. Num mesmo lugar, integramos o WhatsApp, organizamos oportunidades, trazemos o histórico de contatos e empresas e criamos oportunidades. A melhor opção para quem quer crescer com responsabilidade.",
  pilulas: ["Acesso em minutos", "Usuários ilimitados", "Sem fidelidade", "Só API oficial do WhatsApp"],
  entrar: "Entrar",
  acionar: "Acionar agora",
};

export const PAINEL = {
  titulo: ["O painel que sua equipe", "abre de manhã."],
  sub: "É assim por dentro. Clique numa aba ou deixe rodar.",
};

export type Cartao = { icone: string; titulo: string; texto: string; destaque?: boolean };

export const SOLUCOES: { titulo: string[]; sub: string; itens: Cartao[] } = {
  titulo: ["Núcleo de soluções:", "tudo que você precisa."],
  sub: "Menos ferramentas, menos assinatura, menos aba aberta. O que a equipe comercial usa, junto.",
  itens: [
    { icone: "Users", titulo: "CRM", texto: "Contato, empresa, histórico e responsável no mesmo cadastro." },
    { icone: "Kanban", titulo: "Funil de vendas personalizado", texto: "Etapas, probabilidades e valores do seu jeito. Arrasta e muda." },
    {
      icone: "MessageCircle",
      titulo: "WhatsApp com os números da sua empresa",
      texto: "Conversa, áudio, vídeo e documento dentro do CRM, com a equipe toda.",
      destaque: true,
    },
    { icone: "Bot", titulo: "Agentes iA treinados pela sua empresa", texto: "Respondem no seu tom, qualificam e passam para a equipe." },
    { icone: "FileSignature", titulo: "Assinatura de contratos", texto: "Proposta vira contrato assinado sem sair do negócio." },
    { icone: "Megaphone", titulo: "Integração com a Meta", texto: "Lead de anúncio do Facebook e Instagram cai direto no funil." },
    { icone: "ClipboardList", titulo: "Formulários", texto: "Crie, publique e receba. Cada envio já chega com origem." },
    { icone: "Send", titulo: "Campanhas personalizadas", texto: "Mensagem certa para o grupo certo, com registro de quem respondeu." },
    { icone: "BarChart3", titulo: "Relatórios e dashboards", texto: "Origem do lead, taxa por etapa, receita por vendedor." },
    { icone: "UsersRound", titulo: "Usuários ilimitados", texto: "Coloque o time inteiro. Sem cobrança por assento." },
    { icone: "History", titulo: "Histórico de contatos e empresas", texto: "Quem falou, quando, o que ficou combinado. Nada se perde." },
    { icone: "ShieldCheck", titulo: "Equipe e permissões", texto: "Cada pessoa vê o que precisa para trabalhar." },
  ],
};

export const API_OFICIAL = {
  titulo: "Só usamos a API oficial do WhatsApp.",
  texto:
    "Nada de QR Code, celular ligado na tomada ou número bloqueado do nada. A integração é a homologada pela Meta: número verificado, estável, com várias pessoas atendendo ao mesmo tempo. É assim que uma operação de vendas tem que funcionar.",
};

export const IDEAL_PARA = {
  titulo: ["Núcleo i9", "é ideal para:"],
  itens: [
    { icone: "MessageSquareReply", texto: "quem não quer deixar contato sem resposta" },
    { icone: "Users", texto: "quem precisa colocar a equipe para trabalhar junto" },
    { icone: "History", texto: "quem quer ver o histórico do trabalho registrado" },
    { icone: "Layers", texto: "quem quer menos ferramentas e mais resultado" },
    { icone: "BarChart3", texto: "quem quer os números compilados" },
    { icone: "Lightbulb", texto: "quem quer resolver as coisas e trazer informação importante" },
  ],
  frase: "Sua equipe de vendas precisa de uma solução simples que funciona, com um custo que cabe no seu orçamento.",
};

export const AGENTES = {
  selo: "Agentes iA",
  titulo: ["Agentes de IA que atendem,", "entendem, conversam,", "agendam e fecham negócios."],
  sub: "A inteligência artificial assume o primeiro contato. Entende o que a pessoa quer, responde no tom da sua empresa e só passa para alguém quando vale a pena.",
  destaque: ["Agentes de IA que vendem por você.", "Por texto e por voz, no tom da sua marca."],
  destaqueTexto:
    "Eles conhecem os seus clientes, respondem na hora, tiram dúvidas, vencem objeções e abrem oportunidades. 24 horas por dia, sem descanso.",
  orbitais: ["Texto", "Voz", "24 h", "Objeções", "Agenda", "Tom da marca"],
  montar: {
    titulo: ["Configure um agente,", "ou vários, em minutos."],
    sub: "Sem programador, sem prompt gigante. Você responde perguntas simples sobre a sua empresa e o Agente iA nasce pronto para o WhatsApp.",
    agentes: [
      { nome: "Lia | Recepcionista", iniciais: "LI", cor: "#0075BE", papel: "Recebe todo mundo, entende o que a pessoa quer e encaminha.", chips: ["Ligado", "Piloto automático", "v3", "Todas as linhas"] },
      { nome: "Isa | Atendimento", iniciais: "IS", cor: "#35CC62", papel: "Tira dúvidas, qualifica e agenda. Fala no tom da marca.", chips: ["Rascunho", "Copiloto", "v2", "Todas as linhas"] },
      { nome: "Caio | Financeiro", iniciais: "CA", cor: "#184E6C", papel: "Segunda via, prazo, boleto. Sem ocupar a equipe.", chips: ["Rascunho", "Copiloto", "v1", "Linha financeiro"] },
    ],
    passos: [
      { grupo: "Montar", nome: "Identidade", icone: "User" },
      { grupo: "Montar", nome: "Estilo", icone: "Palette" },
      { grupo: "Montar", nome: "Fluxo", icone: "Workflow" },
      { grupo: "Montar", nome: "Regras", icone: "ShieldCheck" },
      { grupo: "Montar", nome: "Comportamento", icone: "SlidersHorizontal" },
      { grupo: "Montar", nome: "Ferramentas", icone: "Wrench" },
      { grupo: "Montar", nome: "Gatilhos e linha", icone: "PhoneCall" },
      { grupo: "Treinar", nome: "Conhecimento", icone: "BookOpen" },
      { grupo: "Publicar", nome: "Testar e publicar", icone: "Rocket" },
    ],
    argumentos: [
      { icone: "Users", titulo: "Um agente para cada papel", texto: "Recepção, atendimento, financeiro, pós-venda. Cada um com nome, foto, papel e especialidade. Quantos você quiser." },
      { icone: "ToggleRight", titulo: "Piloto automático ou copiloto", texto: "No automático, ele responde sozinho. No copiloto, ele sugere e a sua equipe envia. Você escolhe por agente." },
      { icone: "ListChecks", titulo: "9 passos guiados", texto: "Identidade, estilo, fluxo, regras, comportamento, ferramentas, gatilhos, conhecimento, teste. Com barra de progresso, sem se perder." },
      { icone: "BookOpen", titulo: "Treine com o que você já tem", texto: "Site, PDF, tabela de preços, perguntas frequentes. Ele aprende o seu negócio, não um negócio genérico." },
      { icone: "GitBranch", titulo: "Versões e publicação", texto: "Rascunho vira v1, v2, v3. Publica quando quiser e volta atrás se precisar. Nada vai ao ar sem você mandar." },
      { icone: "PhoneCall", titulo: "Em todas as linhas ou numa só", texto: "O mesmo agente em todos os números da empresa, ou um agente por linha. Com a API oficial do WhatsApp." },
    ],
  },
  pontos: [
    { icone: "Power", titulo: "Liga e desliga quando precisar", texto: "Um interruptor por conversa e um por conta. Você decide." },
    { icone: "ArrowRightLeft", titulo: "Transfere para a equipe de vendas", texto: "Com o histórico inteiro, sem a pessoa repetir nada." },
    { icone: "Zap", titulo: "Responde em segundos", texto: "Ninguém fica esperando no WhatsApp." },
    { icone: "BellRing", titulo: "Alerta 24 horas por dia", texto: "Fim de semana, madrugada, feriado. Chegou lead, você sabe." },
    { icone: "GraduationCap", titulo: "Aprende constantemente", texto: "Quanto mais atende, mais conhece o seu negócio." },
  ],
  conversa: [
    { de: "cliente", texto: "Oi, vi o anúncio de vocês. Como funciona o plano para clínica?" },
    { de: "ia", texto: "Olá! Eu sou a assistente da Clínica Viva. Posso te explicar rapidinho e já agendar uma avaliação. Você prefere manhã ou tarde?" },
    { de: "cliente", texto: "Tarde, quinta se der." },
    { de: "ia", texto: "Quinta às 15h está livre. Confirmo no seu nome, Juliana?" },
    { de: "cliente", texto: "Pode confirmar!" },
    { de: "sistema", texto: "Avaliação agendada · quinta 15h · oportunidade criada no funil" },
  ],
};

export type Fase = { num: string; nome: string; titulo: string; texto: string; formula: string[]; icone: string };

export const JORNADA = {
  selo: "Automação na prática",
  titulo: ["Com o Núcleo i9, você", "não perde nenhuma", "oportunidade."],
  sub: "Do primeiro oi à venda, cada passo acontece sozinho. Clique numa fase ou deixe rodar.",
  fases: [
    { num: "01", nome: "Novo lead", icone: "UserPlus", titulo: "Chegou lead?", texto: "Do anúncio, do site ou do WhatsApp: ele entra no funil com origem, responsável e hora. Ninguém precisa digitar.", formula: ["Lead recebido", "vendedor definido", "oportunidade aberta"] },
    { num: "02", nome: "Atendimento do agente", icone: "Bot", titulo: "O Agente iA responde na hora.", texto: "Em segundos, no tom da sua marca. Tira dúvidas, vence objeções e qualifica antes de alguém da equipe gastar tempo.", formula: ["Mensagem", "resposta em 8 s", "lead qualificado"] },
    { num: "03", nome: "Follow-up", icone: "RotateCcw", titulo: "Ficou de pensar?", texto: "O Núcleo i9 espera o tempo que você definiu, confere se houve resposta e volta sozinho pelo WhatsApp.", formula: ["Sem resposta", "24 h", "follow-up enviado"] },
    { num: "04", nome: "Lembrete", icone: "BellRing", titulo: "Reunião marcada?", texto: "Cliente e vendedor recebem o lembrete na hora certa, com a tarefa já no CRM. Ninguém esquece, ninguém falta.", formula: ["Reunião próxima", "lembrete", "confirmação registrada"] },
    { num: "05", nome: "Criação de oportunidade", icone: "Kanban", titulo: "Interesse vira oportunidade.", texto: "Com valor, etapa e próximo passo, no funil certo. A equipe vê onde cada negócio está e quanto tem parado.", formula: ["Interesse confirmado", "oportunidade R$ 9.600", "etapa Proposta"] },
    { num: "06", nome: "Venda", icone: "Trophy", titulo: "Fechou.", texto: "Proposta aceita, contrato assinado no celular, card em Ganha. E o histórico inteiro fica guardado para a próxima venda.", formula: ["Proposta aceita", "contrato assinado", "Ganha"] },
  ] as Fase[],
};

export const MEMORIA = {
  selo: "Nada se perde",
  titulo: ["Sua equipe pode", "até esquecer.", "O Núcleo i9", "jamais esquece."],
  sub: "A inteligência artificial não te deixa perder nada. Saiba tudo o que ela e os seus colaboradores têm acesso a todo momento: o que foi dito, o que foi tratado, o que ficou combinado. Nada se perde. Novos conhecimentos se criam.",
  pontos: [
    { icone: "AudioLines", titulo: "Áudio vira texto", texto: "Mensagem de voz chega transcrita e resumida no histórico." },
    { icone: "History", titulo: "Cada toque registrado", texto: "Mensagem, ligação, reunião, proposta: tudo na linha do tempo da pessoa." },
    { icone: "BrainCircuit", titulo: "Conhecimento que cresce", texto: "O que o cliente prefere, o que já disse não, o que pediu: a iA aprende e a equipe vê." },
    { icone: "Users", titulo: "Todo mundo na mesma página", texto: "Quem assume a conversa amanhã sabe tudo o que aconteceu hoje." },
  ],
};

export const BOLSO = {
  titulo: ["CRM de bolso."],
  sub: "Uma versão compacta para acessar de qualquer lugar. A sua equipe de vendas resolve e entende tudo o que precisa, no celular. Perfeito para equipes que trabalham em home office.",
  pontos: ["Conversas, funil e tarefas na palma da mão", "Notificação de lead novo na hora", "Funciona no iPhone e no Android, sem instalar nada"],
  notificacoes: [
    { titulo: "Nova mensagem de Mariana", texto: "“Fechado! Me manda o Pix que eu pago agora.”", quando: "agora" },
    { titulo: "Novo lead recebido", texto: "Roberto · Instagram Ads", quando: "agora" },
    { titulo: "Tarefa em 10 min", texto: "Ligar para o Roberto", quando: "agora" },
    { titulo: "Contrato assinado", texto: "Clínica Viva · R$ 4.800", quando: "2 min" },
  ],
};

export const BENEFICIOS = {
  titulo: ["Benefícios para", "o seu negócio."],
  sub: "Crie conexões mais profundas, personalizadas e rentáveis com os seus clientes e colha benefícios que vão além dos financeiros.",
  itens: [
    { icone: "Info", titulo: "Informa", texto: "O número certo, na hora que você pergunta." },
    { icone: "Clock", titulo: "Poupa tempo", texto: "Menos aba, menos planilha, menos retrabalho." },
    { icone: "Minimize2", titulo: "Simplifica", texto: "Um lugar, uma tela, um jeito de fazer." },
    { icone: "Coins", titulo: "Receita adicional", texto: "Lead que não esfria vira venda." },
    { icone: "ShieldCheck", titulo: "Reduz riscos", texto: "API oficial, dado separado por conta, permissão por pessoa." },
    { icone: "FolderKanban", titulo: "Organiza", texto: "Cada negociação com etapa, valor e próximo passo." },
    { icone: "Plug", titulo: "Integra", texto: "WhatsApp, Meta, contrato e formulário conversando." },
    { icone: "Link", titulo: "Conecta", texto: "Contato, empresa e histórico ligados entre si." },
    { icone: "Feather", titulo: "Reduz esforço", texto: "O repetitivo acontece sozinho." },
    { icone: "CircleSlash", titulo: "Evita complicação", texto: "Sem setup de semanas nem consultoria para começar." },
    { icone: "TrendingDown", titulo: "Reduz custos", texto: "Várias assinaturas viram uma." },
    { icone: "Gem", titulo: "Qualidade", texto: "Feito por quem atende cliente há 20 anos." },
    { icone: "LayoutGrid", titulo: "Variedade", texto: "CRM, conversa, contrato, campanha, relatório." },
    { icone: "MousePointerClick", titulo: "Experiência de uso", texto: "Limpo, rápido e sem manual." },
  ],
};

export const COMPARATIVO = {
  titulo: ["Troque várias assinaturas", "por uma."],
  sub: "Centralize comercial e atendimento num lugar e pare de pagar por ferramenta que não conversa com a outra.",
  // Valores de referência: os mesmos do comparativo público da WeSales
  // (wesalescrm.com), colhidos em 15/10/2026. "≈" é estimativa deles.
  linhas: [
    { ferramenta: "CRM e gestão de pipeline", concorrente: "RD Station + Kommo", logos: ["/concorrentes/rdstation-com.png", "/concorrentes/kommo-com.png"], preco: "R$ 524/mês*" },
    { ferramenta: "Funis de vendas ilimitados", concorrente: "ClickFunnels", logos: ["/concorrentes/clickfunnels-com.png"], preco: "≈ R$ 501/mês" },
    { ferramenta: "Relatórios e dashboards", concorrente: "Looker Studio Pro", logos: ["/concorrentes/google-com.png"], preco: "≈ R$ 46/mês" },
    { ferramenta: "Automação em grupos de WhatsApp", concorrente: "BotConversa", logos: ["/concorrentes/botconversa-com.png"], preco: "R$ 297/mês" },
    { ferramenta: "Assinatura de documento e envio de proposta", concorrente: "Clicksign", logos: ["/concorrentes/clicksign-com.png"], preco: "R$ 59/mês" },
    { ferramenta: "Agentes de IA de mensagem", concorrente: "Blip", logos: ["/concorrentes/blip-ai.png"], preco: "R$ 299/mês" },
    { ferramenta: "Inteligências artificiais", concorrente: "Anthropic, ChatGPT", logos: ["/concorrentes/anthropic.png", "/concorrentes/chatgpt.png"], preco: "Assinatura à parte" },
    { ferramenta: "Usuários ilimitados", concorrente: "Cobrado por assento", logos: [], preco: "Por usuário" },
  ],
  incluso: "Incluso",
  totalSeparado: { rotulo: "Ferramentas separadas", valor: "Mais de R$ 1.700/mês" },
  totalNucleo: { rotulo: "No Núcleo i9", valor: "Uma assinatura" },
  nota: "* Valores de referência de out/2026, conforme comparativo público do mercado; podem mudar sem aviso.",
  garantias: ["Risco zero", "Satisfação garantida", "Não exigimos fidelidade"],
};

export type Plano = { nome: string; para: string; destaque?: boolean; itens: string[]; nota?: string };

export const PLANOS: { titulo: string[]; sub: string; itens: Plano[]; rodape: string[] } = {
  titulo: ["Uma assinatura para", "toda a operação."],
  sub: "Sem taxa de setup, sem cobrança por assento, sem fidelidade. Você aciona, a gente liga.",
  itens: [
    {
      nome: "Essencial",
      para: "Para quem vende no WhatsApp e quer parar de perder contato hoje.",
      itens: ["CRM completo", "Pipeline personalizado", "Usuários e contas individuais ilimitados", "WhatsApp com API oficial, ilimitado"],
    },
    {
      nome: "Professional",
      para: "Para quem tem equipe e quer atendimento 24 horas.",
      destaque: true,
      itens: ["Tudo do Essencial", "Criação de Agentes iA", "Até 10 números de WhatsApp"],
    },
    {
      nome: "Sob medida",
      para: "Para operação com volume e processo próprio.",
      itens: ["Tudo do Professional", "Módulos customizados para a sua empresa", "Valor a combinar"],
    },
  ],
  rodape: ["Acesso liberado em minutos", "Você monta sua equipe", "Sistema simples e descomplicado", "Já funcionando"],
};

export const COMO_COMECA = {
  titulo: ["Do \"de acordo\"", "ao primeiro lead no funil."],
  passos: [
    { titulo: "De acordo", texto: "Você aciona, a gente confirma. Sem taxa de setup." },
    { titulo: "Acesso em minutos", texto: "Login liberado no seu e-mail, conta já configurada." },
    { titulo: "Você monta sua equipe", texto: "Convida quem quiser. Usuários ilimitados." },
    { titulo: "Já funcionando", texto: "Simples, descomplicado, sem manual." },
  ],
};

export const I9 = {
  selo: "Quem faz",
  titulo: ["Uma agência digital com", "mais de 20 anos de estrada."],
  texto:
    "Experiência e criatividade não são mais o diferencial de uma agência. Orçamento e resultado são. Por isso entendemos, com a experiência do mercado e dos nossos clientes, o que você precisa.",
  numeros: [
    { valor: 20, sufixo: "+", rotulo: "Anos de mercado" },
    { valor: 500, sufixo: "+", rotulo: "Projetos entregues" },
    { valor: 200, sufixo: "+", rotulo: "Marcas atendidas" },
  ],
  logo: { arquivo: "/marca/i9-criacoes-branco.png", alt: "i9 Criações" },
  setores: [
    { nome: "Agronegócio", icone: "Wheat" },
    { nome: "Clínicas e saúde", icone: "Stethoscope" },
    { nome: "Serviços financeiros", icone: "Landmark" },
    { nome: "Construtoras e imobiliárias", icone: "Building2" },
    { nome: "Educação e cursos", icone: "GraduationCap" },
    { nome: "Varejo e e-commerce", icone: "ShoppingCart" },
    { nome: "Automotivo", icone: "Car" },
    { nome: "Empresas B2B", icone: "Briefcase" },
    { nome: "Serviços", icone: "Wrench" },
    { nome: "Empresas B2C", icone: "Users" },
  ],
  certificacoesTitulo: "Certificações e parcerias",
  certificacoes: [
    { nome: "Google Partner", arquivo: "/selos/google-partner.png" },
    { nome: "Google Analytics", arquivo: "/selos/google-analytics.png" },
    { nome: "Facebook Marketing Partner", arquivo: "/selos/facebook-partner.png" },
    { nome: "LinkedIn Marketing Partner", arquivo: "/selos/linkedin-partner.png" },
    { nome: "ABMRA", arquivo: "/selos/abmra.png" },
    { nome: "SharpSpring", arquivo: "/selos/sharpspring.png" },
    { nome: "HubSpot Partner", arquivo: "/selos/hubspot-solutions-directory.png" },
    { nome: "RD Station Partner", arquivo: "/selos/rd-station-partners.svg" },
  ],
};

export const CLIENTES = {
  titulo: ["Clientes parceiros, projetos e desafios", "que nos ajudaram a entender", "que menos é mais."],
  sub: "O simples que resolve.",
  logos: [
    { nome: "BASF", arquivo: "/clientes/basf-2.png" },
    { nome: "Corinthians", arquivo: "/clientes/corinthians.png" },
    { nome: "Centro Paula Souza", arquivo: "/clientes/cps.png" },
    { nome: "Crefisa", arquivo: "/clientes/crefisa.png" },
    { nome: "Dow", arquivo: "/clientes/dow.png" },
    { nome: "DSM", arquivo: "/clientes/dsm.png" },
    { nome: "EcoRodovias", arquivo: "/clientes/ecorodoviasgrupo.png" },
    { nome: "EMS", arquivo: "/clientes/ems.png" },
    { nome: "FESPSP", arquivo: "/clientes/fespsp.png" },
    { nome: "FIDI", arquivo: "/clientes/fidi.png" },
    { nome: "Flint Group", arquivo: "/clientes/flintgroup.png" },
    { nome: "Grupo RBS", arquivo: "/clientes/gruporbs.png" },
    { nome: "GVT", arquivo: "/clientes/gvt.png" },
    { nome: "Honda", arquivo: "/clientes/honda.png" },
    { nome: "Huawei", arquivo: "/clientes/huawei.png" },
    { nome: "Ihara", arquivo: "/clientes/ihara.png" },
    { nome: "InterSystems", arquivo: "/clientes/intersystems.png" },
    { nome: "Kraft Foods", arquivo: "/clientes/kraftfoods.png" },
    { nome: "Leo Madeiras", arquivo: "/clientes/leomadeiras.png" },
    { nome: "LG", arquivo: "/clientes/lg.png" },
    { nome: "África", arquivo: "/clientes/africa.png" },
    { nome: "Massey Ferguson", arquivo: "/clientes/masseyferguson.png" },
    { nome: "Mastermind", arquivo: "/clientes/mastermind.png" },
    { nome: "Mercedes-Benz", arquivo: "/clientes/mercedesbenz.png" },
    { nome: "Nakata", arquivo: "/clientes/nakata.png" },
    { nome: "Nestlé", arquivo: "/clientes/nestle.png" },
    { nome: "New Holland", arquivo: "/clientes/newholland.png" },
    { nome: "Nextel", arquivo: "/clientes/nextel.png" },
    { nome: "Nissan", arquivo: "/clientes/nissan.png" },
    { nome: "Nufarm", arquivo: "/clientes/nufarm.png" },
    { nome: "Objetivo", arquivo: "/clientes/objetivo.png" },
    { nome: "Pé na Trilha", arquivo: "/clientes/penatrilha.png" },
    { nome: "Pepsi", arquivo: "/clientes/pepsi.png" },
    { nome: "Philips", arquivo: "/clientes/philips.png" },
    { nome: "PMA", arquivo: "/clientes/pma.png" },
    { nome: "Polishop", arquivo: "/clientes/polishop.png" },
    { nome: "Rotary International", arquivo: "/clientes/rotaryinternational.png" },
    { nome: "Sadia", arquivo: "/clientes/sadia.png" },
    { nome: "Santander", arquivo: "/clientes/santander.png" },
    { nome: "Santos", arquivo: "/clientes/santos.png" },
    { nome: "Siemens", arquivo: "/clientes/siemens.png" },
    { nome: "Solo", arquivo: "/clientes/solo.png" },
    { nome: "TAM", arquivo: "/clientes/tam.png" },
    { nome: "Telhanorte", arquivo: "/clientes/telhanorte.png" },
    { nome: "TV Bus Mídia", arquivo: "/clientes/tvbusmidia.png" },
    { nome: "Unilever", arquivo: "/clientes/unilever.png" },
    { nome: "Valagro", arquivo: "/clientes/valagro.png" },
    { nome: "Valtra", arquivo: "/clientes/valtra.png" },
    { nome: "Vegetais Saudáveis", arquivo: "/clientes/vegetaissaudaveis.png" },
    { nome: "Vivo", arquivo: "/clientes/vivo.png" },
    { nome: "Volvo", arquivo: "/clientes/volvo.png" },
    { nome: "Votorantim", arquivo: "/clientes/votorantim.png" },
    { nome: "Wincor Nixdorf", arquivo: "/clientes/wincor.png" },
  ],
};

export const FAQ = {
  titulo: ["Perguntas", "frequentes."],
  itens: [
    {
      p: "Qual plano eu escolho?",
      r: "Vende sozinho ou com time pequeno e quer resolver o WhatsApp hoje: Essencial. Tem equipe e quer atendimento 24 horas com Agentes iA e mais números: Professional. Operação com volume e processo próprio: Sob medida, com módulos feitos para a sua empresa.",
    },
    {
      p: "Tem fidelidade ou multa?",
      r: "Não. Você cancela quando quiser, sem multa e sem burocracia. Risco zero e satisfação garantida.",
    },
    {
      p: "Por que só API oficial do WhatsApp?",
      r: "Porque conexão por QR Code depende de um celular ligado e pode ser bloqueada sem aviso. A API oficial é a integração homologada pela Meta: número verificado, estável, várias pessoas atendendo o mesmo número. É a única que a gente coloca numa operação de vendas.",
    },
    {
      p: "Quantos usuários posso ter?",
      r: "Ilimitados, em todos os planos, sem custo por assento. Coloque o time inteiro.",
    },
    {
      p: "Preciso entender de tecnologia?",
      r: "Não. O acesso chega pronto, a conta já vem configurada e a gente liga o WhatsApp com você.",
    },
    {
      p: "Funciona no celular?",
      r: "Sim. O CRM de bolso roda no navegador do iPhone e do Android, sem instalar nada.",
    },
    {
      p: "Integra com o que eu já uso?",
      r: "WhatsApp (API oficial), Facebook e Instagram (leads de anúncio), assinatura eletrônica de contratos, formulários no seu site e webhooks.",
    },
    {
      p: "O que acontece quando eu aciono?",
      r: "Você entra na lista e a gente te chama para ligar a sua conta. O acesso é liberado em minutos depois do de acordo.",
    },
    {
      p: "E os meus dados?",
      r: "Cada conta fica separada das outras, com permissão por pessoa. Os dados são seus. Veja a Política de Privacidade e a página de Exclusão de dados.",
    },
  ],
};

export const CTA_FINAL = {
  titulo: ["Tudo num só lugar.", "Comece hoje."],
  sub: "Acesso em minutos. Usuários ilimitados. Sem fidelidade.",
};

export const RODAPE = {
  empresa: "Núcleo i9 é um produto da i9 Criações.",
  razao: "Marcelo de Souza Almeida Criações Ltda. · CNPJ 12.679.715/0001-00 · São Paulo/SP",
  links: [
    { label: "Política de Privacidade", href: "/privacidade/" },
    { label: "Termos de Uso", href: "/termos/" },
    { label: "Exclusão de dados", href: "/exclusao-de-dados/" },
  ],
};

export const LISTA_ESPERA = {
  titulo: "Entre na lista de espera",
  sub: "A gente te chama para ligar o seu Núcleo i9.",
  campos: { nome: "Seu nome", email: "Seu e-mail", empresa: "Sua empresa" },
  consentimento: "Aceito a política de privacidade e o tratamento dos meus dados.",
  botao: "Entrar na lista",
  enviando: "Enviando…",
  sucesso: "Pronto! Você está na lista. A gente entra em contato em breve.",
  erro: "Não deu para enviar agora. Tente de novo ou escreva para contato@nucleoi9.com.br.",
};

export const ENTRAR = {
  titulo: "Entrar no Núcleo i9",
  sub: "Use o e-mail e a senha da sua conta. A gente te leva para o painel da sua empresa.",
  email: "E-mail",
  senha: "Senha",
  botao: "Entrar",
  google: "Continuar com o Google",
  esqueci: "Esqueci a senha",
  ou: "ou",
  semConta: "Essa conta ainda não está ligada a uma empresa no Núcleo i9.",
  porEndereco: "Entrar pelo endereço da sua conta",
  enderecoAjuda: "É o começo do endereço que você usa: suaempresa.nucleoi9.com.br",
  ir: "Ir para o painel",
  voltar: "Voltar para o site",
  recuperacaoEnviada: "Enviamos um link para redefinir a senha. Confira o e-mail.",
};
