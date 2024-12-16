import todoService from '../services/todoService.js';

export default {

  //responsável por criar uma nova tarefa
  async create(req, res, next) {
    try {
      const todoData = { ...req.body, userId: req.userId };
      const todo = await todoService.create(todoData);
      return res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  },

  //responsável por listar as tarefas do usuário
  async listTodos(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const todos = await todoService.listTodos(req.userId, page, limit);
      return res.status(200).json(todos);
    } catch (error) {
      next(error);
    }
  },

  //responsavel por listar as tarefas pendentes do usuário
  async listPendingTodos(req, res, next) {
    try {
      const pendingTodos = await todoService.listPendingTodos(req.userId);
      return res.status(200).json(pendingTodos);
    } catch (error) {
      next(error);
    }
  },

  //responsável por listar as tarefas atrasadas do usuário
  async listOverdueTodos(req, res, next) {
    try {
      const overdueTodos = await todoService.listOverdueTodos(req.userId);
      return res.status(200).json(overdueTodos);
    } catch (error) {
      next(error);
    }
  },

  //responsavel por marcar uma tarefa como concluída
  async markAsCompleted(req, res, next) {
    try {
      const { id } = req.params;
      const todoId = parseInt(id, 10);
      const todo = await todoService.markAsCompleted(todoId, req.userId);
      return res.status(200).json(todo);
    } catch (error) {
      next(error);
    }
  },
};
