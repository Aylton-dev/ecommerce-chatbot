import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Muitas requisições do seu IP, tente novamente mais tarde.',
  standardHeaders: true,
  legacyHeaders: false,
});

export const chatLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  message: 'Você está mandando muitas mensagens. Aguarde um pouco.',
  skip: (req) => req.ip === '127.0.0.1',
});

export const initialMessageLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: 'Muitas requisições. Tente novamente mais tarde.',
});
