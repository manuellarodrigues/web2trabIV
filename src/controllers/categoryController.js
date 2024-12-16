import categoryService from '../services/categoryService.js';

export default {
  //responsável por criar uma nova categoria
  async create(req, res, next) {
    try {
      const categoryData = { ...req.body, ownerId: req.userId };
      console.log('Categoria Dados:', categoryData);
      const category = await categoryService.create(categoryData);
      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  },

  //responsável por listar as categorias do usuário
  async listCategories(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const categories = await categoryService.listCategories(req.userId, page, limit);
      return res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  },

  //responsável por compartilhar uma categoria com outro usuário
  async shareCategory(req, res, next) {
    try {
      const { categoryId } = req.params;
      console.log('Controller - categoryId:', categoryId);
      const { sharedWithUserId } = req.body;
      console.log('Controller - sharedWithUserId:', sharedWithUserId);
      await categoryService.shareCategory(categoryId, sharedWithUserId, req.userId);
      return res.status(200).json({ message: 'Categoria compartilhada com sucesso.' });
    } catch (error) {
      next(error);
    }
  },

  //responsável por listar as categorias compartilhadas com o usuário
  async listSharedCategories(req, res, next) {
    try {
      const sharedCategories = await categoryService.listSharedCategories(req.userId);
      return res.status(200).json(sharedCategories);
    } catch (error) {
      next(error);
    }
  },
};
