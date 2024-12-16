import bcrypt from 'bcrypt';
import userService from '../services/userService.js';
import { sendEmail } from '../services/emailService.js'; // Importando o serviço de envio de e-mails
import authService from '../services/authService.js'; // Importando o serviço de autenticação

export default {
  async register(req, res) {

    const { name, email, password } = req.body;

    try {
      // verificando se o e-mail já está cadastrado
      const existingUser = await userService.findByEmail(email);

      //se já existir um usuário com o e-mail informado, retorna um erro
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já registrado.' });
      }

      // criando um novo usuário no banco de dados
      const newUser = await userService.create({ name, email, password });

      // chamando o serviço de geração de token de e-mail o authService responsável por centralizar a geração de tokens JWT
      const emailToken = authService.generateEmailToken(newUser.id);

      // enviando um e-mail de verificação para o usuário
      const verificationLink = `${process.env.APP_URL}/auth/verify-email/${emailToken}`;
      const emailContent = `<p>Olá ${newUser.name},</p>
                            <p>Clique no link abaixo para confirmar seu e-mail:</p>
                            <a href="${verificationLink}">Confirmar E-mail</a>`;

      //chamando a function sendEmail do emailService para enviar o e-mail
      await sendEmail(newUser.email, 'Verifique seu e-mail', emailContent);

      res.status(201).json({ message: 'Usuário criado com sucesso. Verifique seu e-mail para ativar a conta.' });
    } catch (error) {
      console.error('Erro ao registrar o usuário:', error);
      res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
  },

  //metodo responsável por fazer o login do usuário
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userService.findByEmail(email);
      if (!user) return res.status(400).json({ error: 'Credenciais inválidas.' });

      const isTestUser = email === 'teste@gmail.com';

      // verificando se o e-mail do usuário foi verificado
      if (!isTestUser && !user.isEmailVerified) {
        return res.status(400).json({ error: 'E-mail não verificado. Por favor, verifique seu e-mail.' });
      }

      // verificando se a senha informada é válida, comparando com a senha criptografada no banco de dados
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return res.status(400).json({ error: 'Credenciais inválidas.' });

      // chamando novamente o authService (responsavel pela centralizacao da geracao de tokens) para gerar o token de autenticação
      const token = authService.generateAuthToken(user.id);

      res.status(200).json({ token });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login.' });
    }
  },

  // verificando o token de verificação de e-mail
  async verifyEmail(req, res) {
    const { token } = req.params;
    try {
      // decodificando o token de verificação no authService
      const decoded = authService.verifyToken(token);

      // buscando o usuário pelo id
      const user = await userService.findById(decoded.userId);

      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });

      //marca o e-mail do usuário como verificado
      await userService.verifyEmail(user.id);

      res.status(200).json({ message: 'E-mail verificado com sucesso.' });
    } catch (error) {
      console.error('Erro ao verificar o e-mail:', error);
      res.status(400).json({ error: 'Token de verificação inválido ou expirado.' });
    }
  },
};
