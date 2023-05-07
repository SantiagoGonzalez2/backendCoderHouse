import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";


const secretKey = "micookie";

const router = Router();
//registro
router.post(
  "/register",
  passport.authenticate("register",{ session: "false" }),
  async (req, res) => {
    console.log("Registrando nuevo usuario.");
    res
      .status(201)
      .send({ status: "success", message: "Usuario creado con extito." });
  }
);

//ingreso
router.post( "/login",passport.authenticate('local', { session: "false" }),
  async (req, res) => {
    const user = req.user;

    if (!user)
      return res.status(401).send({status: "error",error: "El usuario y la contraseña no coinciden!",});
    
// //usuario por session
    
//       req.session.user = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       role: user.role,
//       cart: user.cart,
//     };

// usuario por token    
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name:  `${user.first_name} ${user.last_name}`,
        cart: user.cart,
        role:user.role

      },
      secretKey,
      { expiresIn: "1h" }
    );
    console.log(token);
    res.cookie("jwt", token, { httpOnly: true });

    res.send({ status: "success",payload: req.session.user,message: "¡Primer logueo realizado! :)"});
  }
);



// ingreso con gitHub
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] },{ session: "false" }),
  async (req, res) => {}
);

router.get(
  "/githubcallback",
  passport.authenticate("github", { session: "false" }),
  async (req, res) => {
    const user = req.user;
    req.session.user = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      cart: user.cart,
    };

    res.redirect("/views/products");
  }
);


//destroy
// router.get("/logout", function (req, res) {
//   req.session.destroy();
//   res.redirect("/users/login");
//   console.log("sesion destruida");
// });


// destroy cookie
router.get("/logout", function (req, res) {
    res.clearCookie('jwt');
    res.redirect("/users/login");
    console.log("cookie borrada");
  });
  

export default router;
