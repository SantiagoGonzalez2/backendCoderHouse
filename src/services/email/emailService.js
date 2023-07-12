// services/emailService.js
import nodemailer from 'nodemailer';
import config from '../../config/config.js';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.email,
    pass: config.pass
  }
});

const sendEmail = async (mailOptions) => {
  try {
    const result = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado:', result.messageId);
    return result;
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
    throw error;
  }
};

 export const sendEmailWithLink = async (email, link) => {
  const mailOptions = {
    from: config.email,
    to: email,
    subject: 'Restablecer contraseña',
    text: `¡Hola! Para restablecer tu contraseña, haz clic en el siguiente enlace: ${link}`,
  };

  await sendEmail(mailOptions);
};

export default sendEmail;
