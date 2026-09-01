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
  const productsText = PRODUCTS.map((p) => `- ${p.name} - R$ ${p.price}`).join('\n');

  return `
Você é o assistente virtual da loja "DevStore".
Responda de forma cortês, objetiva e profissional.
Tópico atual: ${topic}.
Objetivo deste tópico: ${TOPICS[topic]?.instruction || 'Responda de forma útil e objetiva.'}
Use somente as informações disponíveis. Nunca invente status de pedido, confirmação de pagamento, prazo ou protocolo.
Responda em no máximo 2 parágrafos curtos. Não mencione limitações técnicas, integração, equipe de suporte ou contato futuro, a menos que o cliente pergunte diretamente.
Quando faltar um dado obrigatório, faça apenas uma pergunta objetiva para obtê-lo.

Produtos disponíveis:
${productsText}
`;
}

export function formatHistory(history) {
  return Array.isArray(history)
    ? history.map((item) => ({
        role: item.role === 'user' ? 'user' : 'model',
        parts: [{ text: String(item.text || '') }],
      }))
    : [];
}
