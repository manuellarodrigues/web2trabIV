import categoryModel from '../models/categoryModel.js';

export default {

  //serviço para criar uma nova categoria
  async create(categoryData) {
    console.log('Dados recebidos pelo serviço de categoria:', categoryData);
    return categoryModel.create(categoryData);
  },

  //serviço para listar as categorias do usuário
  async listCategories(userId, page, limit) {
    return categoryModel.listByUser(userId, page, limit);
  },

  //serviço para compartilhar uma categoria com outro usuário
  async shareCategory(categoryId, sharedWithUserId, userId) {
    const parsedCategoryId = parseInt(categoryId, 10);
    console.log('shareCategory - parsedCategoryId:', parsedCategoryId);
    const category = await categoryModel.findById(parsedCategoryId);
    if (!category || category.ownerId !== userId) throw new Error('Acesso negado.');

    await categoryModel.shareWithUser(categoryId, sharedWithUserId);
  },

  //serviço para listar as categorias compartilhadas com o usuário
  async listSharedCategories(userId) {
    return categoryModel.listSharedWithUser(userId);
  },
};
