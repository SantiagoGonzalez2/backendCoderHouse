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


// probando jwt


export const secretKey = 'micookie';



export default __dirname;
