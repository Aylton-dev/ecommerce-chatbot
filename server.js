import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { TOPICS, INITIAL_CHAT_MESSAGE } from './constants.js';
import { normalizeTopic, buildSystemInstruction, formatHistory } from './utils.js';
import { generalLimiter, chatLimiter, initialMessageLimiter } from './middleware.js';
import { setupSwagger } from './swagger.js';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error('ERRO: A variável GEMINI_API_KEY não está definida no arquivo .env!');
}

const app = express();
app.use(cors());
app.use(express.json());

// Aplicar rate-limiting geral
app.use(generalLimiter);

// Configurar Swagger
setupSwagger(app);

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * @swagger
 * /api/chat/initial-message:
 *   get:
 *     summary: Obtém a mensagem inicial do chatbot
 *     description: Retorna uma mensagem de boas-vindas com opções de assunto para o cliente escolher
 *     tags:
 *       - Chat
 *     responses:
 *       200:
 *         description: Mensagem inicial com opções de assuntos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InitialMessage'
 *       429:
 *         description: Limite de requisições excedido
 */
app.get('/api/chat/initial-message', initialMessageLimiter, (req, res) => {
  return res.json(INITIAL_CHAT_MESSAGE);
});

/**
 * @swagger
 * /api/chat:
 *   post:
 *     summary: Envia uma mensagem ao chatbot
 *     description: Processa a mensagem do usuário e retorna a resposta da IA baseada no tópico selecionado
 *     tags:
 *       - Chat
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChatRequest'
 *     responses:
 *       200:
 *         description: Resposta do chatbot processada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChatResponse'
 *       400:
 *         description: Erro de validação na requisição
 *       429:
 *         description: Limite de requisições excedido
 *       500:
 *         description: Erro interno do servidor
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, history, topic } = req.body;
    const normalizedTopic = normalizeTopic(topic);

    if (!message) {
      return res.status(400).json({ error: 'A mensagem do usuário é obrigatória.' });
    }

    if (!TOPICS[normalizedTopic]) {
      return res.status(400).json({
        error: 'Tópico inválido.',
        topics: Object.keys(TOPICS),
      });
    }

    const formattedHistory = formatHistory(history);

    const chat = ai.chats.create({
      model: 'gemini-3.6-flash',
      config: {
        systemInstruction: buildSystemInstruction(normalizedTopic),
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({
      message: message
    });

    return res.json({
      reply: response.text,
      topic: normalizedTopic,
    });
  } catch (error) {
    console.error('Erro detalhado:', error);
    return res.status(500).json({
      error: 'Erro ao processar resposta do chatbot.',
      details: error.message,
    });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📚 Documentação da API: http://localhost:${PORT}/api-docs\n`);
});