import express from 'express';
import 'dotenv/config'; // Carrega as variáveis de ambiente
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json' assert { type: "json" };
import prisma from './src/models/prisma.js';
import errorHandler from './src/middlewares/errorMiddleware.js';
import routes from './src/routes/index.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 3000;

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.send('Bem-vindo à API de Tarefas! Visite /api-docs para a documentação.');
});

// Middlewares globais
app.use(express.json()); // Para parsear JSON
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger

// Conectar as rotas
app.use('/api', routes);
console.log("Rotas registradas:", routes);

// Middleware para erros
app.use(errorHandler);

// Função para criar usuário hardcoded
async function createTestUser() {
  const existingUser = await prisma.user.findUnique({
    where: { email: 'teste@gmail.com' },
  });

  if (!existingUser) {

    const hashedPassword = await bcrypt.hash('teste123', 10);

    await prisma.user.create({
      data: {
        email: 'teste@gmail.com',
        password: hashedPassword, 
        name: 'Usuário Teste',
      },
    });
    console.log('Usuário de teste criado com sucesso!');
  } else {
    console.log('Usuário de teste já existe.');
  }
}

// Iniciar o servidor
async function startServer() {
  try {
    await prisma.$connect(); // Conecta ao banco de dados
    console.log('Conectado ao banco de dados com sucesso!');

    // Criação do usuário de teste
    await createTestUser();

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1); // Finalizar processo em caso de erro grave
  }
}

startServer();
