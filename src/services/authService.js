// src/services/authService.js
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

//centralizando a geração de tokens JWT. meu authservice é responsável por gerar tokens JWT para autenticação e verificação de email

//gerando um token JWT para verificação de e-mail
const generateEmailToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

//gerando um token JWT para autenticação
const generateAuthToken = (userId) => { return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' }); };

//verificando se o token é válido
const verifyToken = (token) => { try { return jwt.verify(token, JWT_SECRET); } catch (error) { throw new Error('Token de verificação inválido ou expirado.'); } };

export default {
  generateEmailToken,
    generateAuthToken,
    verifyToken
};
