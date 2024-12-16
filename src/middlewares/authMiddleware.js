// src/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

//middleware responsavel pela autenticação
const authMiddleware = {
  //metodo que acessa a propriedade Authorization do cabeçalho da requisição e verifica se o token JWT foi fornecido
  isAuthenticated: (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Cabeçalho Authorization:", authHeader);

    //se o token não foi fornecido, retorna um erro
    if (!authHeader) {
      console.log("Token não fornecido");
      return res.status(401).json({ error: 'Token não fornecido.' });
    }

    //separa o token do cabeçalho
    const token = authHeader.split(' ')[1];
    console.log("Token extraído:", token);

    //e entao verifica se o token é válido e se foi gerado com a chave JWT_SECRET
    try {
      const decoded = jwt.verify(token, jwtSecret);
      console.log("Token decodificado com sucesso:", decoded);
      req.userId = decoded.userId;
      next();
    } catch (error) {
      console.error("Erro ao verificar o token:", error);
      return res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
  },
};

export default authMiddleware;
