import prisma from './prisma.js';

export default {

  // buscando o usuário pelo id
  async findById(userId) {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  //encontrando um usuário pelo email
  async findOne(query) {
    return await prisma.user.findUnique({
      where: { email: query.email },
    });
  },

  //atualizando o perfil do usuário (era um metodo extra que pensei em colocar mas nao implementei)
  async updateProfile(userId, updatedData) {
    return prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
  },

  //criando um usuário com email, senha e nome
  async create({ email, password, name }) {
    return await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
  },
};
