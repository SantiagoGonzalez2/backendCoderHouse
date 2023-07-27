import { Router } from "express";
import userController from "../../controllers/user/userController.js";
import passport from 'passport';
const router = Router();

//registro
router.post("/register", userController.registerUser);

//login
router.post("/login", userController.loginUser);

//update passwprd
router.post('/updatepassword/:token', userController.updatePassword);


router.post('/mail', passport.authenticate("jwt", { session: false }),userController.sendEmailPass)

//destroy
router.get("/logout",passport.authenticate("jwt", { session: false }),userController.logoutUser);

//dto
router.get("/current",passport.authenticate("jwt", { session: false }),userController.userDto)


//actualizar usuario 
router.put("/premium/:uid", userController.updateUserRole);







export default router;
