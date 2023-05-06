import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// generamos el  HASH
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));


// validamos la contraseña con la que esta en la DB como hash
export const isValidPassword = (user, password )=>{
    
    return bcrypt.compareSync(password, user.password)
}


//corroborar si es admin

export const isAdmin = (req, res, next) => {
    const user = req.session.user;
    if (user && user.role === 'admin') {
      next();
      console.log("Usuario en modo administrador");
    } else {
      res.status(401).send('No estas autorizado a ingresar');
    }
  }
  

export  const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/users/login');
  }
}




export default __dirname;