import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.post("/register", passport.authenticate('register'),
    async (req, res) => {
        console.log("Registrando nuevo usuario.");
        res.status(201).send({ status: "success", message: "Usuario creado con extito." });
    });


 router.post("/login", passport.authenticate('login'), async (req, res) => {
        
        const user = req.user;
        // const user = req.session.user

       
        if (!user) return res.status(401).send({ status: "error", error: "El usuario y la contraseña no coinciden!" });
        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age,
            role: user.role
        }
        res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
    });

router.get('/logout', (req, res)=>{
    req.logout();
  res.redirect('/users/login');
})






export default router