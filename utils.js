import { TOPICS, TOPIC_ALIASES, PRODUCTS } from './constants.js';

export function normalizeTopic(topic) {
  const normalized = String(topic || 'geral')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

  const slug = normalized.replace(/[ -]+/g, '_');
  return TOPIC_ALIASES[slug] || slug;
}

export function buildSystemInstruction(topic) {
  const productsText = PRODUCTS.map((p) => [
    `- ${p.name} - ${p.price}`,
    `  Descrição: ${p.desc}`,
    `  Ficha técnica: ${p.specs.join('; ')}`,
  ].join('\n')).join('\n');

  return `
Você é o assistente virtual da loja "TechNova".
Responda de forma cortês, objetiva e profissional.
Tópico atual: ${topic}.
Objetivo deste tópico: ${TOPICS[topic]?.instruction || 'Responda de forma útil e objetiva.'}
Atenda somente assuntos relacionados à loja, produtos, pedidos, devoluções ou atendimento.
Se a mensagem não tiver relação com esses assuntos, responda: "Não consigo ajudar com esse assunto. Você precisa de ajuda com algum dos tópicos do atendimento?"
Não tente interpretar, aconselhar ou desenvolver conversas fora desse escopo.
Quando o cliente pedir a ficha técnica, especificações ou specs de um produto, informe todos os itens da ficha técnica correspondente. Não responda somente com o preço.
Use somente as informações disponíveis. Nunca invente status de pedido, confirmação de pagamento, prazo ou protocolo.
Responda em no máximo 2 parágrafos curtos. Não mencione limitações técnicas, integração, equipe de suporte ou contato futuro, a menos que o cliente pergunte diretamente.
Quando faltar um dado obrigatório, faça apenas uma pergunta objetiva para obtê-lo.

Produtos disponíveis:
${productsText}
`;
}

export function isSupportMessage(message) {
  const normalized = String(message || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const supportTerms = [
    ...Object.keys(TOPICS),
    ...Object.values(TOPIC_ALIASES),
    ...PRODUCTS.flatMap((product) => [product.id, product.name]),
    'produto', 'produtos', 'preco', 'valor', 'caracteristica', 'especificacao',
    'spec', 'specs', 'ficha tecnica', 'disponibilidade', 'pedido', 'compra',
    'devolucao', 'troca', 'atendente', 'suporte', 'entrega',
  ];

  return supportTerms.some((term) => normalized.includes(
    String(term).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(),
  ));
}

export function findProduct(message) {
  const normalized = String(message || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return PRODUCTS.find((product) => [product.id, product.name].some((term) => (
    normalized.includes(term.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase())
  )));
}

export function isTechnicalSheetRequest(message) {
  const normalized = String(message || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  return /ficha tecnica|especifica|spec\b|specs\b|caracteristica tecnica/.test(normalized);
}

export function formatTechnicalSheet(product) {
  return `${product.name}\nPreço: ${product.price}\nDescrição: ${product.desc}\nFicha técnica:\n${product.specs.map((spec) => `- ${spec}`).join('\n')}`;
}

export function formatHistory(history) {
  return Array.isArray(history)
    ? history.map((item) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.text || '') }],
      }))
    : [];
}
