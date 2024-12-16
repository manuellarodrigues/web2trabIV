import express from 'express';
import todoController from '../controllers/todoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { todoSchema } from '../middlewares/validationSchemas.js';

const router = express.Router();

router.use(authMiddleware.isAuthenticated); 

// rota para criar uma TODO
router.post('/', validationMiddleware.validate(todoSchema), todoController.create);

// rota para listar todas as TODOs
router.get('/', todoController.listTodos);

// rota para listar TODOs pendentes
router.get('/pending', todoController.listPendingTodos);

// rota para listar TODOs atrasadas
router.get('/overdue', todoController.listOverdueTodos);

// rota para marcar uma TODO como concluída
router.patch('/:id/complete', todoController.markAsCompleted);

export default router;
