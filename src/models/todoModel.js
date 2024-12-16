import prisma from './prisma.js'; //importando o objeto prisma

export default {

  //criando um todo  
  async create(todoData) {
    return prisma.todo.create({ data: todoData });
  },

  //listando por usuario os todos
  async listByUser(userId, page, limit) {
    const skip = (page - 1) * limit;
    return prisma.todo.findMany({
      where: { userId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  //listando por status completado os todos
  async listByStatus(userId, completed) {
    return prisma.todo.findMany({ where: { userId, completed } });
  },

  //listando por data de vencimento os todos
  async listOverdue(userId) {
    const today = new Date();
    return prisma.todo.findMany({ where: { userId, dueDate: { lt: today }, completed: false } });
  },

  //encontrando um todo pelo id
  async findById(todoId) {
    return prisma.todo.findUnique({ where: { id: todoId } });
  },

  //atualizando o status de um todo
  async updateStatus(todoId, completed) {
    return prisma.todo.update({ where: { id: todoId }, data: { completed } });
  },
};
