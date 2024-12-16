// src/controllers/userController.js
import userService from '../services/userService.js';

export default {
  //responsavel por pegar o perfil do usuario
  async getProfile(req, res, next) {
    try {
      console.log("getProfile chamado");
      console.log("req.userId:", req.userId);
      const userId = req.userId; 
      const user = await userService.getProfile(userId);  // Chama o método do service para buscar o perfil
      console.log("user:", user);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro em getProfile:", error);
      next(error);
    }
  },
  
  async updateProfile(req, res, next) {
    try {
      console.log("updateProfile chamado");
      const userId = req.userId;  // O ID do usuário autenticado
      const updatedUser = await userService.updateProfile(userId, req.body);  // Atualiza o perfil
      console.log("updatedUser:", updatedUser);
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Erro em updateProfile:", error);
      next(error);
    }
  },
};
