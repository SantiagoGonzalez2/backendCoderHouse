import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

// ruta para archivos locales
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// generacion HASH para passwoard
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

//corroborar si el usuario es admin

export const isAdmin = (req, res, next) => {
  const user = req.session.user;
  if (user && user.role === "admin") {
    next();
    console.log("Usuario en modo administrador");
  } else {
    res.status(401).send("No estas autorizado a ingresar");
  }
};

// corroborar si hay usuario logueado
export const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/users/login");
  }
};

// Manejo de sesiones con JWT ////////////////////////////////

import jwt from "jsonwebtoken";

// generamos una clave para utilizar como referencia al cifrado
const PRIVATE_KEY = "micookie";

// generar el token

// 1 objeto con usuario 2 clave de cifrado 3 tiempo de vida

 export const generateToken = (user) => {
  const token = jwt.sign({ user }, PRIVATE_KEY, { expiresIn: "2h" });
  return token;
};

// autenticacion del token

export const authToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: "no hay token " });
  }
  const token = authHeader.split("")[1]; //split para retirar palabra que esta adelante del token
  jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
    //jwt verifica el token existente
    if (error) {
      return res.status(403).send({ error: "no autorizado" });
    }
    req.user = credentials.user;
    console.log(token);
    next();
  });
};

export default __dirname;
