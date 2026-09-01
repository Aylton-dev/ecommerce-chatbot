export const TOPICS = {
  geral: {
    label: 'Dúvidas gerais sobre produtos',
    instruction: 'Pergunte sobre qual produto o cliente deseja saber mais informações. Forneça detalhes sobre preço, características e disponibilidade. Se o cliente não especificar o produto, peça que ele informe qual produto deseja saber mais.',
  },
  devolucao: {
    label: 'Devolução',
    instruction: 'Explique a política de devolução com clareza. Pergunte o número do pedido e o motivo da devolução quando forem necessários.',
  },
  problema_pedido: {
    label: 'Problemas com o pedido',
    instruction: 'Se o cliente não informar o número do pedido, peça somente esse número. Seja direto e não descreva encaminhamentos ou próximos passos que não foram solicitados.',
  },
  atendimento_humano: {
    label: 'Atendimento humano',
    instruction: 'Indique que o cliente pode continuar com um atendente humano. Peça o seu nome e o melhor canal de contato se a conversa exigir isso.',
  },
};

export const TOPIC_ALIASES = {
  'duvidas_gerais_sobre_produtos': 'geral',
  'geral': 'geral',
  'produtos': 'geral',
  'devolucao': 'devolucao',
  'devolucoes': 'devolucao',
  'devolucao_de_produto': 'devolucao',
  'problema_pedido': 'problema_pedido',
  'problema_com_o_pedido': 'problema_pedido',
  'problemas_com_o_pedido': 'problema_pedido',
  'pedido': 'problema_pedido',
  'atendimento_humano': 'atendimento_humano',
  'atendente_humano': 'atendimento_humano',
  'falar_com_humano': 'atendimento_humano',
  'humano': 'atendimento_humano',
};

export const INITIAL_CHAT_MESSAGE = {
  reply: `Olá! Como posso ajudar hoje?\n\nEscolha uma opção:\n1. Dúvidas gerais sobre produtos\n2. Devolução\n3. Problemas com o pedido\n4. Atendimento humano`,
  options: Object.entries(TOPICS).map(([value, item]) => ({
    value,
    label: item.label,
  })),
  type: 'initial',
};

export const PRODUCTS = [
  {
    id: 'nova-book',
    name: 'NOVA BOOK ULTRA',
    price: 'R$ 18.900,00',
    desc: 'Computador quântico portátil com processamento neural integrado e autonomia estendida para tarefas de alta complexidade.',
    specs: ['CPU: Quantum Z1 24-Core', 'RAM: 128GB LPDDR6', 'Bateria: 48h Contínuas', 'Ecrã: 16" OLED 165Hz'],
    img: 'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000',
  },
  {
    id: 'quantum-gpu',
    name: 'QUANTUM GPU X',
    price: 'R$ 7.500,00',
    desc: 'Arquitetura de renderização quântica em tempo real para simulações holográficas e IA generativa ultra veloz.',
    specs: ['VRAM: 48GB GDDR7', 'Clock: 5.4 GHz Boost', 'Ray Tracing: Gen 5', 'TDP: 160W Eco-Mode'],
    img: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000',
  },
  {
    id: 'cyber-watch',
    name: 'CYBER WATCH S',
    price: 'R$ 3.200,00',
    desc: 'Monitoramento de telemetria biológica com feedback neural háptico e construção ultraleve em titânio aeroespacial.',
    specs: ['Chassi: Titânio Grau 5', 'Sensores: Bio-Neural 4.0', 'Display: Cristal Safira', 'Resistência: 100m Sub'],
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
  },
  {
    id: 'neural-phone',
    name: 'NEURAL PHONE PRO',
    price: 'R$ 9.400,00',
    desc: 'O primeiro smartphone com barramento de sinapse direta para produtividade sem toque.',
    specs: ['Chip: Bionic Quantum 2', 'Armazenamento: 2TB', 'Câmera: 200MP Prism', 'Rede: 6G Ready'],
    img: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=1000',
  },
  {
    id: 'void-pc',
    name: 'VOID RIG QUANTUM',
    price: 'R$ 29.800,00',
    desc: 'Estação de trabalho extrema com resfriamento líquido criogênico e acabamento cerâmico.',
    specs: ['Dual CPU Quantum', '256GB ECC RAM', '4x 4TB NVMe Gen5', 'Fonte: 1600W Titânio'],
    img: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&q=80&w=1000',
  },
  {
    id: 'cyber-display',
    name: 'CYBER DISPLAY 8K',
    price: 'R$ 14.500,00',
    desc: 'Monitor de referência para criadores de mundos virtuais com taxa de contraste infinita.',
    specs: ['Resolução: 7680x4320', 'Taxa: 240Hz', 'Brilho: 2000 Nits', 'HDR: Quantum Max'],
    img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000',
  },
];
