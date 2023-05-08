import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import  jwt  from "jsonwebtoken";

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

// export const isAdmin = (req, res, next) => {
//   const user = req.session.user;
//   if (user && user.role === "admin") {
//     next();
//     console.log("Usuario en modo administrador");
//   } else {
//     res.status(401).send("No estas autorizado a ingresar");
//   }
// };

// corroborar si hay usuario logueado
// export const isAuthenticated = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect("/users/login");
//   }
// };


// probando jwt


export const secretKey = 'micookie';
// validar si llega un token , "hay usuario logueado"
 export const verifyToken = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    
    return res.redirect("/users/login");;
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'El token no es válido' });
    }

    req.user = decoded;
    next();
  });
};



// Middleware para verificar si el usuario es administrador
export const isAdmin = (req, res, next) => {
  // Verificar el token y decodificar la información del usuario
  verifyToken(req, res, () => {
    // Verificar si el usuario tiene el rol de admin
    if (req.user.role === 'admin') {
      next(); // Permitir acceso
    } else {
      res.status(403).json({ message: 'No tienes permiso para ingresar' }); // Denegar el acceso a la ruta
    }
  });
};


export default __dirname;
