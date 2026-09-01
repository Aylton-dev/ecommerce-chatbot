import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevStore Chatbot API',
      version: '1.0.0',
      description: 'API de atendimento ao cliente com inteligência artificial. Oferece suporte para dúvidas sobre produtos, devoluções, problemas com pedidos e atendimento humano.',
      contact: {
        name: 'DevStore',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desenvolvimento',
      },
      {
        url: 'https://api.devstore.com',
        description: 'Servidor de produção',
      },
    ],
    components: {
      schemas: {
        HistoryItem: {
          type: 'object',
          required: ['role', 'text'],
          properties: {
            role: {
              type: 'string',
              enum: ['user', 'model'],
              description: 'Papel do participante na conversa',
            },
            text: {
              type: 'string',
              description: 'Conteúdo da mensagem',
            },
          },
          example: {
            role: 'user',
            text: 'Quero devolver um produto',
          },
        },
        ChatRequest: {
          type: 'object',
          required: ['message', 'topic'],
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem do usuário',
              example: 'Quero devolver um produto',
            },
            topic: {
              type: 'string',
              enum: ['geral', 'devolucao', 'problema_pedido', 'atendimento_humano'],
              description: 'Tipo de assunto que o cliente deseja tratar',
              example: 'devolucao',
            },
            history: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/HistoryItem',
              },
              description: 'Histórico da conversa',
              example: [],
            },
          },
        },
        ChatResponse: {
          type: 'object',
          properties: {
            reply: {
              type: 'string',
              description: 'Resposta do chatbot',
            },
            topic: {
              type: 'string',
              description: 'Tópico processado',
            },
          },
          example: {
            reply: 'Claro! Qual é o número do seu pedido para que eu possa ajudá-lo?',
            topic: 'devolucao',
          },
        },
        InitialMessage: {
          type: 'object',
          properties: {
            reply: {
              type: 'string',
              description: 'Mensagem de boas-vindas',
            },
            options: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  value: {
                    type: 'string',
                  },
                  label: {
                    type: 'string',
                  },
                },
              },
              description: 'Opções de assuntos disponíveis',
            },
            type: {
              type: 'string',
              enum: ['initial'],
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensagem de erro',
            },
            topics: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Tópicos válidos (apenas em erro de validação)',
            },
          },
        },
      },
    },
  },
  apis: ['./server.js'],
};

export const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  }));

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}
