import todoModel from '../models/todoModel.js';

export default {
  //serviço para criar uma nova tarefa
  async create(todoData) {
    return todoModel.create(todoData);
  },

  //serviço para listar as tarefas do usuário
  async listTodos(userId, page, limit) {
    return todoModel.listByUser(userId, page, limit);
  },

  //serviço para listar as tarefas pendentes do usuário
  async listPendingTodos(userId) {
    return todoModel.listByStatus(userId, false);
  },

  //serviço para listar as tarefas atrasadas do usuário
  async listOverdueTodos(userId) {
    return todoModel.listOverdue(userId);
  },

  //serviço para marcar uma tarefa como concluída
  async markAsCompleted(todoId, userId) {
    const todo = await todoModel.findById(todoId);
    if (!todo || todo.userId !== userId) throw new Error('Acesso negado.');

    return todoModel.updateStatus(todoId, true);
  },
};
