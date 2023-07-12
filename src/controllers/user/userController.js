import userService from "../../services/user/userService.js";
import CustomError from "../../services/error/customError.js";
import UserDTO from "../../services/dto/user.dto.js";
import config from "../../config/config.js";
import { sendEmailWithLink } from "../../services/email/emailService.js";
import  jwt  from "jsonwebtoken";
import { secretKey } from "../../utils.js";



//registro
const registerUser = async (req, res) => {
  const { first_name, last_name, email, password, age } = req.body;

  try {
    const user = await userService.registerUser(first_name, last_name, email, password, age);

    res.status(201).send({
      status: "success",
      message: "Usuario creado con éxito.",
      user,
    });
  } catch (error) {
    console.error("Error registrando el usuario: ", error);
    throw new CustomError(500, "Error registrando el usuario.");
  }
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.loginUser(email, password);

    if (result.success) {
      
      res.cookie("jwt", result.token, { httpOnly: true });

      
      res.send({
        status: "success",
        user: result.user,
        message: "¡Primer logueo realizado! :)",
      });
    } else {
      throw new CustomError("El usuario y la contraseña no coinciden.", 401);
    }
  } catch (error) {
   
    console.error(error);

    if (error instanceof CustomError) {
      res.status(error.statusCode).send({
        status: "error",
        error: error.message,
      });
    } else {
      res.status(500).send({ status: "error", error: "Error interno del servidor" });
    }
  }
};


const updatePassword = async (req, res) => {
  const  token  = req.params.token; 
  const { newPassword } = req.body;


  try {
    const decoded = jwt.verify(token, secretKey);
    const { email } = decoded;
    await userService.updatePassword(email, newPassword);



    res.send({ status: 'success', message: 'Contraseña actualizada con éxito.' });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      config.logger.error(error)
       
    }
  
    res.redirect('/users/changepass');
  }
};


//envio de link 
const sendEmailPass = async (req, res) => {
  const { email } = req.body;

  try {
    const token = config.generateToken(email);
    const link = `http://localhost:8080/users/update/${token}`;

    await sendEmailWithLink(email, link);

    res.send({ status: 'success', message: 'Correo electrónico enviado correctamente.' });
  } catch (error) {
    config.logger.error('Error al enviar el correo electrónico:', error);
    res.status(500).send({ status: 'error', message: 'Error al enviar el correo electrónico.' });
  }
};




// destroy
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect("/users/login");
    config.logger.info("cookie borrada - sesión terminada");
  };



// dto

const userDto = (req,res) => {
const user = new UserDTO(req.user.name, req.user.role, req.user.email)
res.send(user)
}




const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.uid;
    const user = await userService.getUserById(userId);

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Cambiar el rol del usuario
    if (user.role === "user") {
      user.role = "premium";
    } else {
      user.role = "user";
    }

    await user.save();

    res.send({ status: "success", message: "Rol de usuario actualizado exitosamente" });
  } catch (error) {
    console.error("Error al actualizar el rol de usuario:", error);
    res.status(500).send({ status: "error", error: "Error al actualizar el rol de usuario" });
  }
};



export default {
  registerUser,
  loginUser,
  updatePassword,
  logoutUser,
  sendEmailPass,
  userDto,
  updateUserRole
};
