import categoryModel from '../models/categoryModel.js';
import todoModel from '../models/todoModel.js';

//middleware de permissão
export default {
  //verificando se o usuário tem acesso à categoria
  async hasCategoryAccess(req, res, next) {
    const categoryId = parseInt(req.params.categoryId, 10); //convertendo para inteiro para evitar o erro de int e string
    const { userId } = req;

    //chamando o método do model de categoria para buscar a categoria
    const category = await categoryModel.findById(categoryId);

    //caso a categoria não exista, retorna um erro
    if (!category) return res.status(404).json({ error: 'Categoria não encontrada.' });

    //o usuario tem acesso a categoria se o id dele for igual ao ownerId da categoria
    const hasAccess =
      category.ownerId === userId || // Corrigido para ownerId
      (await categoryModel.listSharedWithUser(categoryId, userId));

    //caso o usuário não tenha acesso à categoria, retorna um erro
    if (!hasAccess) {
      return res.status(403).json({ error: 'Acesso negado à categoria.' });
    }
    //chamanod o next para passar para o próximo middleware
    next();
  },

  //verificando se o usuário tem acesso à tarefa
  async hasTodoAccess(req, res, next) {
    const todoId = parseInt(req.params.todoId, 10); // convertendo para inteiro para evitar o erro de int e string
    const { userId } = req;

    //buscando a tarefa pelo id dela no todoModel
    const todo = await todoModel.findById(todoId);
    if (!todo) return res.status(404).json({ error: 'Tarefa não encontrada.' });

    if (todo.userId !== userId) {
      return res.status(403).json({ error: 'Acesso negado à tarefa.' });
    }

    next();
  },
};
