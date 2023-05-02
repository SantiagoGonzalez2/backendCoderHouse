import passport from "passport";
import passportLocal from 'passport-local'
import { createHash, isValidPassword } from '../utils.js';
import { userModel } from "../models/user.model.js";
import { cartsModel } from "../models/cart.model.js";



// Declarar la estrategia 

const localStrategy = passportLocal.Strategy

const initializePassport = ()=>{
  
    // estrategia register
    passport.use('register', new localStrategy(
        // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
        // usernameField: renombramos el username
        { passReqToCallback: true, usernameField: 'email' },
        async(req,username, password, done) =>{
            const { first_name, last_name, email, age } = req.body;
            try {

                const exists = await userModel.findOne({ email });
                if (exists) {
                    console.log("El usuario ya existe.");
                    return done(null, false);
                }
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password),
                    
                    
                };
                  // si la contraseña es 'peligro123', asignar rol admin
            if (password === 'peligro123') {
                user.role = 'admin';
            }
            //////probado cart por user
            const newCart = new cartsModel();
            await newCart.save();
            user.cart = newCart._id;
           



            /////////
                const result = await userModel.create(user);
                //Todo sale OK
                return done(null, result);
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))


    // estrategia login
    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            try {
                const user = await userModel.findOne({ email: username });
                if (!user) {
                    console.console.log("Credenciales invalidas" + username);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    console.warn("Credenciales invalidas " + username);
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        })
    );


    //Funciones de Serializacion y Desserializacion
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
    // passport.deserializeUser(async (id, done) => {
    //     try {
    //       const userI = await userModel.findById(id);
    //       const cart =  user.cart ;
          
          
    //       if (!userI) {
    //         return done(null, false);
    //       }
    //       console.log(userI._id);
    //       const user = {
    //         _id: userI._id,
    //         name: userI.name,
    //         email: userI.email,
    //         cart: cart._id // agregamos el id del carrito a la sesión del usuario
    //       };
          
    //       return done(null, user);
    //     } catch (err) {
    //       return done(err);
    //     }
    //   });




}

  

export default initializePassport;

