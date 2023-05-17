import jwt from "jsonwebtoken";
import { userModel } from "../../models/user.model.js";
import { isValidPassword, createHash } from "../../utils.js";
import { cartsModel } from "../../models/cart.model.js";
import CustomRouter from "./customRouter.js";

const secretKey = "micookie";

class usuarioRoutes extends CustomRouter {
  constructor() {
    super();
    this.router.post("/register", this.register);
    this.router.post("/login", this.login);
    this.router.get("/logout", this.logout);
    this.router.get("/inicio/login", this.loginView)
    this.router.get("/inicio/register", this.registerView)
  }
  

 

  register = async (req, res) => {
    const { first_name, last_name, email, password, age } = req.body;

    try {
      const exists = await userModel.findOne({ email });
      if (exists) {
        console.log("El usuario ya existe.");
        return res
          .status(400)
          .send({ status: "error", message: "El usuario ya existe." });
      }

      const newCart = new cartsModel();
      await newCart.save();

      const user = await userModel.create({
        first_name,
        last_name,
        email,
        age,
        password: createHash(password),
        cart: newCart._id,
      });

      // Si la contraseña es 'peligro123', asignar rol admin
      if (password === "peligro123") {
        user.role = "admin";
        await user.save();
      }

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

  login = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Verificar si el usuario existe
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).send({
          status: "error",
          error: "El usuario y la contraseña no coinciden!",
        });
      }

      // Verificar si la contraseña es válida
      if (!isValidPassword(user, password)) {
        return res.status(401).send({
          status: "error",
          error: "El usuario y la contraseña no coinciden!",
        });
      }

      // Generar el token JWT
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: `${user.first_name} ${user.last_name}`,
          cart: user.cart,
          role: user.role,
        },
        secretKey,
        { expiresIn: "1h" }
      );

      // Enviar el token JWT en una cookie
      res.cookie("jwt", token, { httpOnly: true });
      console.log(user);

      // Responder con el usuario autenticado y un mensaje de éxito
      res.send({
        status: "success",
        user,
        message: "¡Primer logueo realizado! :)",
      });
    } catch (error) {
      // Manejar errores
      console.error(error);
      res
        .status(500)
        .send({ status: "error", error: "Error interno del servidor" });
    }
  };

  logout = (req, res) => {
    res.clearCookie("jwt");
    res.redirect("/usuarios/inicio/login");
    console.log("cookie borrada-- sesion terminada");
  };

  registerView = (req,res) => {
    res.render('register')
  }

  loginView = (req,res) =>{
    res.render('login')
  }



}

export default usuarioRoutes;






