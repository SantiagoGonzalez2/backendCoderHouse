import { Router } from "express";
import ProductManager from "../../ProductManager.js";
import mongoose from "mongoose";
const router = Router();
const productManager = new ProductManager();
import { isAuthenticated } from "../utils.js";


// devolver los productos
router.get("/", isAuthenticated, async (req, res) => {
  try {
    let page = parseInt(req.query.page);
    if (!page) page = 1;
    const { limit } = req.query;

    if (limit) {
      let productlimit = await productManager.getProductsLimit(limit);
      res.send(productlimit);
    } else {
      let products = await productManager.getAllProducts();
      res.send(products);
    }
  } catch (error) {
    console.log("No se pudo conectar con MONGODB " + error);
    res.status(500).send("No se pudo obtener la lista de productos");
  }
});

//enviar productos
router.post("/", async (request, response) => {
  try {
    let { title, description, price, thumbnail, code, stock, status } =
      request.body;
    let product = await productManager.addProduct({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
    });
    response.status(200).send(product);
  } catch (error) {
    console.log("No se pudo agregar el producto " + error);
    response.status(500).send("No se pudo agregar el producto");
  }
});

// actualizar productos
router.put("/:pid", async (req, res) => {
  try {
    const productUpdate = req.body;
    const pid = req.params.pid;
    const objectId = new mongoose.Types.ObjectId(pid);

    let product = await productManager.updateProduct(objectId, productUpdate);
    res.status(202).send(product);
  } catch (error) {
    console.log("No se pudo actualizar el producto" + error);
    res.status(500).send("No se pudo actualizar el producto");
  }
});

///borrar productos
router.delete("/:pid", async (request, response) => {
  try {
    let product = await productManager.deleteProduct(request.params.pid);
    response.status(200).send("Producto eliminado con éxito");
  } catch (error) {
    console.log("Error al eliminar el producto: " + error);
    response.status(500).send("Error al eliminar el producto");
  }
});

export default router;
