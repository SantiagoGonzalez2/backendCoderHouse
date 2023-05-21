import userService from "../services/userService.js";


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
    res
      .status(500)
      .send({ status: "error", message: "Error registrando el usuario." });
  }
};


//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userService.loginUser(email, password);

    if (result.success) {
      // Enviar el token JWT en una cookie
      res.cookie("jwt", result.token, { httpOnly: true });

      // Responder con el usuario autenticado y un mensaje de éxito
      res.send({
        status: "success",
        user: result.user,
        message: "¡Primer logueo realizado! :)",
      });
    } else {
      res.status(401).send({
        status: "error",
        error: "El usuario y la contraseña no coinciden!",
      });
    }
  } catch (error) {
    // Manejar errores
    console.error(error);
    res.status(500).send({ status: "error", error: "Error interno del servidor" });
  }
};

// destroy
const logoutUser = (req, res) => {
    res.clearCookie('jwt');
    res.redirect("/users/login");
    console.log("cookie borrada - sesión terminada");
  };

export default {
  registerUser,
  loginUser,
  logoutUser
};
