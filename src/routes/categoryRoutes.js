import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import permissionMiddleware from '../middlewares/permissionMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { categorySchema } from '../middlewares/validationSchemas.js';
import categoryController from '../controllers/categoryController.js';

const router = express.Router();

//garantindo que todas as rotas abaixo exigem autenticação
router.use(authMiddleware.isAuthenticated);

//rota post que cria uma categoria, mas antes valida o schema da requisição com o middleware de validação
router.post(
  '/',
  validationMiddleware.validate(categorySchema),
  categoryController.create
);

//rota get que lista todas as categorias
router.get('/', categoryController.listCategories);

//rota get que lista todas as categorias compartilhadas
router.get('/sharedcategories', categoryController.listSharedCategories);

//rota get que lista as categorias de um usuário
router.get('/:categoryId', permissionMiddleware.hasCategoryAccess, categoryController.listCategories);

//rota post que compartilha uma categoria
router.post(
  '/:categoryId/share',
  permissionMiddleware.hasCategoryAccess,
  categoryController.shareCategory
);

export default router;
