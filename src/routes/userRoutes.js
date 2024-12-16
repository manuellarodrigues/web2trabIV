import express from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

console.log("userController:", userController);
console.log("authMiddleware:", authMiddleware);

router.use(authMiddleware.isAuthenticated);

// rota para obter o perfil do usuário logado
router.get('/profile', userController.getProfile);

router.put('/profile', userController.updateProfile);

export default router;
