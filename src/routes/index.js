import express from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import todoRoutes from './todoRoutes.js';
import categoryRoutes from './categoryRoutes.js';

const router = express.Router();

//defindo as rotas de autenticação, usuário, todo e categoria. facilitando a organização do código
//o index.js é o arquivo principal das rotas

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/todos', todoRoutes);
router.use('/categories', categoryRoutes);

export default router;
