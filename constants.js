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
  { id: 1, name: 'Headset Gamer', price: 250 },
  { id: 2, name: 'Teclado Mecânico', price: 180 },
  { id: 3, name: 'Mouse Sem Fio', price: 90 },
];
