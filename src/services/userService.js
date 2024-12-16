// src/services/userService.js
import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';

export default {
  // serviço para obter o perfil do usuário
  async getProfile(userId) {
    try {
      const user = await userModel.findById(userId);
      if (!user) throw new Error('Usuário não encontrado.');
      return user;
    } catch (error) {
      console.error("Erro ao obter perfil:", error);
      throw error;
    }
  },

  // serviço para atualizar o perfil do usuário
  async updateProfile(userId, updateData) {
    try {
      const updatedUser = await userModel.update(userId, updateData); 
      if (!updatedUser) throw new Error('Erro ao atualizar perfil.');
      return updatedUser;
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      throw error;
    }
  },

  //serviço para buscar um usuário por e-mail
  async findByEmail(email) {
    try {
      const user = await userModel.findOne({ email });
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por e-mail:", error);
      throw error;
    }
  },

  //serviço para criar um novo usuário
  async create({ email, password, name }) {
    try {
      // Criptografando a senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criando o novo usuário no banco de dados
      const newUser = await userModel.create({ 
        email,
        password: hashedPassword, 
        name,
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar o usuário:", error);
      throw error;
    }
  },
};
