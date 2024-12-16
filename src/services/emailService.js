import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); //carrega as variáveis de ambiente

//se as variáveis de ambiente EMAIL_USER e EMAIL_PASS não estiverem configuradas, ele lança um erro
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  throw new Error('As variáveis de ambiente EMAIL_USER e EMAIL_PASS não estão configuradas corretamente.');
}

// configurando o transporte de e-mails usando as variáveis de ambiente do arquivo .env
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_PORT === '465',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

// minha function que envia e-mails
export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Projeto TODOs webII" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html, 
    });
    console.log('E-mail enviado:', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw new Error('Erro ao enviar e-mail.');
  }
};
