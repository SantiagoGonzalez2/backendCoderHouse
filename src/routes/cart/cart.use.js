import { Router } from "express";
const router = Router();
import passport from "passport";
import cartController from "../../controllers/cart/cartController.js";


// Crear un nuevo carrito
router.post("/",  cartController.createCart);
  
//Agregar productos
router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), cartController.addProductToCart);

///Borrar 
router.delete("/:cid/products/:pid", passport.authenticate("jwt", { session: false }),  cartController.removeProductFromCart);

//Vaciar
router.delete("/:cid", passport.authenticate("jwt", { session: false }), cartController.removeAllProductsFromCart);

//Actualizar
router.put("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), cartController.updateProductQuantity);

//Leer
router.get("/:cid", cartController.getCartById);

//Generar orden (TICKET)
router.get("/:cid/purchase",passport.authenticate("jwt", { session: false }), cartController.generateOrder)






export default router;
