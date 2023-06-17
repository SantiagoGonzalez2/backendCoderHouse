import userService from "../../services/user/userService.js";
import CustomError from "../../services/error/customError.js";
import UserDTO from "../../services/dto/user.dto.js";


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


// destroy
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect("/users/login");
    console.log("cookie borrada - sesión terminada");
  };



// dto

const userDto = (req,res) => {
const user = new UserDTO(req.user.name, req.user.role, req.user.email)
res.send(user)
}

export default {
  registerUser,
  loginUser,
  logoutUser,
  userDto
};
