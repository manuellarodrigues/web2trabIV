export default {
  //middleware de validação de schema responsavel por validar o schema e ser reutilizado em qualquer rota
  validate: (schema) => (req, res, next) => {
    //utiliza o validate do schema para validar o req.body e o abortEarly para retornar todos os erros e nao parar no primeiro
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({ errors });
    }

    next();
  },
};
