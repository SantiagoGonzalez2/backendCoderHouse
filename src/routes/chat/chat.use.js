import { Router } from "express";
import chatController from "../../controllers/chat/chat.controller.js";
import passport from "passport";
const router = Router();



router.get("/chat",  passport.authenticate("jwt", { session: false }),chatController.renderChat)



export default router 