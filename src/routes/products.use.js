import { Router } from "express";
import productController from "../controllers/productController.js";

const router = Router();


//listar
router.get("/",  productController.getAllProducts);
//agrgar
router.post("/", productController.addProduct);
//actualizar
router.put("/:pid", productController.updateProduct);
//borar
router.delete("/:pid",  productController.deleteProduct);


export default router;
