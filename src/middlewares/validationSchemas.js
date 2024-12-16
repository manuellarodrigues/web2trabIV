import Joi from 'joi';

//definindo meus schemas de validação! ele esta dentro do diretório middlewares, mas ele não é um middleware, é um schema de validação.

//schema de validação para o registro de usuários
export const registerSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//schema de validação para o login de usuários
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

//schema de validação para a criação de todos
export const todoSchema = Joi.object({ 
    title: Joi.string().min(3).max(100).required().messages({ 'string.base': '"title" deve ser um texto', 'string.empty': '"title" é obrigatório', 'string.min': '"title" deve ter pelo menos {#limit} caracteres', 'string.max': '"title" deve ter no máximo {#limit} caracteres', 'any.required': '"title" é obrigatório' }), 
    description: Joi.string().max(500).optional().messages({ 'string.base': '"description" deve ser um texto', 'string.max': '"description" deve ter no máximo {#limit} caracteres' }), 
    dueDate: Joi.date().iso().required().messages({ 'date.base': '"dueDate" deve ser uma data válida', 'any.required': '"dueDate" é obrigatório' }), 
    categoryId: Joi.number().integer().optional().messages({ 'number.base': '"categoryId" deve ser um número inteiro' 

    }), 
});

//schema de validação para a criação de categorias
export const categorySchema = Joi.object({ 
    name: Joi.string().min(3).max(100).required().messages({ 
        'string.base': '"name" deve ser um texto', 
        'string.empty': '"name" é obrigatório', 
        'string.min': '"name" deve ter pelo menos {#limit} caracteres', 
        'string.max': '"name" deve ter no máximo {#limit} caracteres', 
        'any.required': '"name" é obrigatório' }), 
    description: Joi.string().max(500).optional().messages({ 
        'string.base': '"description" deve ser um texto', 
        'string.max': '"description" deve ter no máximo {#limit} caracteres' 
    }),     
});