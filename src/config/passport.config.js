import passport from "passport";
import passportLocal from "passport-local";
import { userModel } from "../db/models/user.model.js";
import GitHubStrategy from "passport-github2";
import jwtStrategy from "passport-jwt";
import { secretKey } from "../utils.js";

import passportJWT from "passport-jwt";

// Declarar la estrategia

// const localStrategy = passportLocal.Strategy;

const initializePassport = () => {
  // // estrategia register
  // passport.use('register', new localStrategy(
  //     // passReqToCallback: para convertirlo en un callback de request, para asi poder iteracturar con la data que viene del cliente
  //     // usernameField: renombramos el username
  //     { passReqToCallback: true, usernameField: 'email' },
  //     async(req,username, password, done) =>{
  //         const { first_name, last_name, email, age } = req.body;
  //         try {

  //             const exists = await userModel.findOne({ email });
  //             if (exists) {
  //                 console.log("El usuario ya existe.");
  //                 return done(null, false);
  //             }
  //             const user = {
  //                 first_name,
  //                 last_name,
  //                 email,
  //                 age,
  //                 password: createHash(password),

  //             };
  //               // si la contraseña es 'peligro123', asignar rol admin
  //         if (password === 'peligro123') {
  //             user.role = 'admin';
  //         }
  //         //////probado cart por user
  //         const newCart = new cartsModel();
  //         await newCart.save();
  //         user.cart = newCart._id;

  //         /////////
  //             const result = await userModel.create(user);
  //             //Todo sale OK
  //             return done(null, result);
  //         } catch (error) {
  //             return done("Error registrando el usuario: " + error);
  //         }
  //     }

  // ))

//   estrategia github
//   passport.use('github', new GitHubStrategy(
//       {
//           clientID: 'Iv1.796045d20c124706',
//           clientSecret: '815c9dc12ffe18e0a3b14247d68dd6318695ee01',
//           callbackUrl: 'http://localhost:8080/api/sessions/githubcallback'
//       },
//       async (accessToken, refreshToken, profile, done) => {
//           console.log("Profile obtenido del usuario: ");
//           console.log(profile);
//           try {
//               const user = await userModel.findOne({email: profile._json.email});
//               console.log("Usuario encontrado para login:");
//               console.log(user);
//               if (!user) {
//                   console.warn("User doesn't exists with username: " + profile._json.email);
//                   const newCart = new cartsModel();
//                   await newCart.save();
//                   let newUser = {
//                       first_name: profile._json.name,
//                       last_name: '',
//                       age: 18,
//                       email: profile._json.email,
//                       password: '',
//                       cart : newCart._id

//                   };

//                   const result = await userModel.create(newUser);
//                   return done(null, result);
//               } else {
//                   //Si entramos por acá significa que el usuario ya existía.
//                   return done(null, user);
//               }
//           } catch (error) {
//               return done(error);
//           }
//       })
//   );

  // estrategia login
  // passport.use('login', new localStrategy(

  //     { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
  //         try {
  //             const user = await userModel.findOne({ email: username });
  //             if (!user) {
  //                 console.log("Credenciales invalidas" + username);
  //                 return done(null, false);
  //             }
  //             if (!isValidPassword(user, password)) {
  //                 console.warn("Credenciales invalidas " + username);
  //                 return done(null, false);
  //             }
  //             return done(null, user);
  //         } catch (error) {
  //             return done(error);
  //         }
  //     })
  // );

  ////// probando estrategia jwt  /////////////

  // estraer coockie
  const cookieExtractor = (req) => {
    let token = null;
    
    if (req && req.cookies) {
   
      token = req.cookies["jwt"];

    }
    return token;
  };
  const JwtStrategy = jwtStrategy.Strategy;
  const ExtractJWT = jwtStrategy.ExtractJwt;

  //Middleware  verifica existencia obtener Token JWT por Cookie //

  passport.use(
    "jwt",
    new JwtStrategy(
      // extraer la  cookie
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
      },
      // Ambiente Async
      async (jwt_payload, done) => {
        console.log("Entrando a passport Strategy con JWT.");
        try {
          console.log("JWT obtenido del payload");
          console.log(jwt_payload);
          return done(null, jwt_payload);
        } catch (error) {
          console.error(error);
          return done(error);
          
        }
      }
    )
  );

  //// Middleware para verificar role(admin)

  passport.use(
    "admin-jwt",
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: secretKey,
      },
      async (jwt_payload, done) => {
        try {
          const user = await userModel.findById(jwt_payload.id);
          if (!user) {
            return done(null, false);
          }
          if (user.role !== "admin" && user.role !== "premium") {
            return done(null, false);
          }
          return done(null, user);
        } catch (error) {
          console.error(error);
          return done(error);
        }
      }
    )
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
};

export default initializePassport;
