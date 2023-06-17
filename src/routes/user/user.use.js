import { Router } from "express";
import userController from "../../controllers/user/userController.js";
import passport from 'passport';
const router = Router();

//registro
router.post("/register", userController.registerUser);

//login
router.post("/login", userController.loginUser);

//destroy
router.get("/logout", userController.logoutUser);

//dto
router.get("/current",passport.authenticate("jwt", { session: false }),userController.userDto)


  
  // ingreso con gitHub
// router.get(
//   "/github",
//   passport.authenticate("github", { scope: ["user:email"] },{ session: "false" }),
//   async (req, res) => {}
// );

// router.get(
//   "/githubcallback",
//   passport.authenticate("github", { session: "false" }),
//   async (req, res) => {
//     const user = req.user;
//     req.user = {
//       name: `${user.first_name} ${user.last_name}`,
//       email: user.email,
//       age: user.age,
//       cart: user.cart,
//     };

//     res.redirect("/views/products");
//   }
// );







export default router;
