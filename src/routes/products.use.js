import { Router } from "express";
import { productsModel } from "../models/products.model.js";
import ProductManager from "../../ProductManager.js";
// import fs from 'fs'
const router = Router();

const class1 = new ProductManager();

router.get("/", async (req, res) => {
  try {


    let page = parseInt(req.query.page);
    if (!page) page = 1;
    const { limit } = req.query;
    let productsMongoDB = await class1.getProducts();

    if (limit) {
      let productlimit = await class1.getProductsLimit(limit);
      res.send(productlimit);
    } else return res.send(productsMongoDB);
  } catch (error) {
    console.log("no se pudo conectar con MONGODB " + error);
  }
});

// router.get("/:pid", async  (req,res)=>{

//     const idProduct =  req.params.pid
//     if (!products.find((obj) => obj.id === parseInt(idProduct))) res.status(400).send({ status: "Error", message: "ID invalido" });
//     const product =   products.find(obj => obj.id === parseInt(idProduct))

//     if (product) return res.status(200).json(product)
//     else return res.status(404).json({message: "product dont exist"})

// })

router.post("/",  (request, response) => {
  
    let { title, description, price, thumbnail, code, stock, status } =
      request.body;
     class1.addToData({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
    });
    response.status(200).send("producto agregado" );
  
});

router.put("/:pid", async (req, res) => {
  // const idProduct =  parseInt(req.params.pid)
  // const productUpdate = req.body
  // const updDate = products.map((product) => product.id === idProduct ?{...product, ...productUpdate} : product)
  // fs.writeFileSync('data.json', JSON.stringify(updDate, null))

  // res.send({message: " product update"})

  try {
    const productUpdate = req.body;

    let product = await productsModel.updateOne(
      { _id: req.params.pid },
      productUpdate
    );
    res.status(202).send(product + "producto actualizado");
  } catch (error) {
    console.log("no se pudo actualizar el producto" + error);
  }
});

router.delete("/:pid", async (request, response) => {
  // let pid = request.params.pid
  // const userPosition = products.filter((product) => product.id !== parseInt(pid))

  // fs.writeFileSync('data.json', JSON.stringify(userPosition, null))

  // return response.send({ status: "Success", message: "Producto eliminado" });

  try {
    let ProductDelete = await productsModel.deleteOne({
      _id: request.params.pid,
    });

    response.status(200).send("borrado con exito");
  } catch (error) {
    console.log("error al borrar" + error);
  }
});

export default router;
