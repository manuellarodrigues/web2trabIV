import express from 'express';
import authController from '../controllers/authController.js';
import validationMiddleware from '../middlewares/validationMiddleware.js'; // Importando o objeto inteiro
import { registerSchema, loginSchema } from '../middlewares/validationSchemas.js';

const router = express.Router();

//todas as rotas abaixo não exigem autenticação e utilizam o middleware de validação de schema que recebe o schema como parâmetro

// rota para registrar usuário
router.post('/register', validationMiddleware.validate(registerSchema), authController.register);

// rota para login
router.post('/login', validationMiddleware.validate(loginSchema), authController.login);

// rota para validação de e-mail
router.get('/verify-email/:token', authController.verifyEmail);

export default router;
