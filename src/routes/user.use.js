import { Router } from 'express';
import passport from 'passport';
import { generateToken } from '../utils.js';


const router = Router();
//registro
router.post("/register", passport.authenticate('register'),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });

//ingreso
 router.post("/login", passport.authenticate('login'), async (req, res) => {
        
        const user = req.user;
        // const user = req.session.user

       
        if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role,
            cart: user.cart
        }
//probado jwt
        const token = generateToken(user)
        res.cookie('jwtCookieToken', token , {
            maxAge: 60000,
            // httpOnly: false // expone la cookie
            httpOnly: true // No expone la cookie
        })
        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    });


// ingreso con gitHub
router.get("/github", passport.authenticate('github', {scope: ['user:email']}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate('github'), async (req, res) => {
    const user = req.user;
    req.session.user= {
        name : `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age,
        cart: user.cart
    };
    
    res.redirect("/views/products");
});

//destroy
    router.get('/logout', function(req, res){
        
        req.session.destroy();
        res.redirect('/users/login');
        console.log("sesion destruida");
      });
      
      



export default router