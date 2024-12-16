import prisma from './prisma.js'; //me conectando com o banco de dados prisma

export default {

  //criando a categoria
  async create(categoryData) {
    return prisma.category.create({
      data: {
        name: categoryData.name,
        owner: {
          connect: { id: categoryData.ownerId }, // associando o id ao ownerId
        },
      },
    });
  },

  //listando as categorias do usuário
  async listByUser(userId, page, limit) {
    const skip = (page - 1) * limit;
    return prisma.category.findMany({
      where: { ownerId: userId }, 
      include: { todos: true },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  },

  //compartilhando a categoria com outro usuário
  async shareWithUser(categoryId, sharedWithUserId) {
    console.log('shareWithUser - sharedWithUserId:', sharedWithUserId);
    return prisma.categoryShare.create({
      data: {
        categoryId: parseInt(categoryId, 10),
        sharedWithId: sharedWithUserId,
      },
    });
  },

  //listando as categorias compartilhadas com o usuário
  async listSharedWithUser(userId) {
    return prisma.categoryShare.findMany({
      where: { sharedWithId: userId },
      include: {
        category: true,
      },
    });
  },

  //buscando a categoria pelo id
  async findById(categoryId) {
    return prisma.category.findUnique({
      where: { id: categoryId },
    });
  },
};
