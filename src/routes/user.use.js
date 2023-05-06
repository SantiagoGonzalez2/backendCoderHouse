import { Router } from 'express';
import passport from 'passport';

const router = Router();
//registro
router.post("/register", passport.authenticate('register'),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

// //ingreso
//  router.post("/login", passport.authenticate('login'), async (req, res) => {
        
//         const user = req.user;
//         // const user = req.session.user

       
//         if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
//         req.session.user = {
//             name: `${user.first_name} ${user.last_name}`,
//             email: user.email,
//             age: user.age,
//             role: user.role,
//             cart: user.cart
//         }
//         res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
//     });

// router.get("/:userId", authToken,
// async (req, res) =>{
//     const userId = req.params.userId;
//     try {
//         const user = await userModel.findById(userId);
//         if (!user) {
//             res.status(202).json({message: "User not found with ID: " + userId});
//         }
//         res.json(user);
//     } catch (error) {
//         console.error("Error consultando el usuario con ID: " + userId);
//     }
// });

//destroy
    router.get('/logout', function(req, res){
        
        req.session.destroy();
        res.redirect('/users/login');
        console.log("sesion destruida");
      });
      
      



export default router