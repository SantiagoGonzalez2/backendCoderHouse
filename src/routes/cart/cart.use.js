import { Router } from "express";
const router = Router();
import passport from "passport";
import cartController from "../../controllers/cartController.js";


// Crear un nuevo carrito
router.post("/", passport.authenticate("jwt", { session: false }), cartController.createCart);
  
//Agregar productos
router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), cartController.addProductToCart);

///Borrar 
router.delete("/:cid/products/:pid", passport.authenticate("jwt", { session: false }),  cartController.removeProductFromCart);

//Vaciar
router.delete("/:cid", passport.authenticate("jwt", { session: false }), cartController.removeAllProductsFromCart);

//Actualizar
router.put("/:cid/products/:pid",  cartController.updateProductQuantity);

//Leer
router.get("/:cid", cartController.getCartById);




export default router;
