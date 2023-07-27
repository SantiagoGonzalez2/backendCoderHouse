import { Router } from "express";
import productController from "../../controllers/product/productController.js";
import passport from 'passport';

const router = Router();


//listar
router.get("/", passport.authenticate('admin-jwt', { session: false }), productController.getAllProducts);
//agrgar
router.post("/",passport.authenticate('jwt', { session: false }), productController.addProduct);
//actualizar
router.put("/:pid",passport.authenticate('jwt', { session: false }), productController.updateProduct);
//borar
router.delete("/:pid",passport.authenticate('admin-jwt', { session: false }),  productController.deleteProduct);


export default router;
