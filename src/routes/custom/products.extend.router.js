import CustomRouter from "./customRouter.js";
import ProductManager from "../../services/product/ProductManager.js";
import { productsModel } from "../../db/models/products.model.js";
import passport from "passport";
import mongoose from "mongoose";



const productManager = new ProductManager()

class ProductosRouter extends CustomRouter {
  
  constructor() {
    super();
    this.router.get("/",passport.authenticate('jwt', { session: false }), this.getProducts);
    this.router.post("/", passport.authenticate('admin-jwt', { session: false }),this.addProduct);
    this.router.put("/:pid",passport.authenticate('admin-jwt', { session: false }), this.updateProduct);
    this.router.delete("/:pid",passport.authenticate('admin-jwt', { session: false }), this.deleteProduct);
    this.router.get('/agregar', passport.authenticate('admin-jwt', { session: false }),this.newProduct);
    this.router.get('/eliminar',passport.authenticate('admin-jwt', { session: false }),this.deleteView)
  }
  

  async getProducts(req, res) {
    try {
        passport.authenticate("jwt", { session: false })(req, res, async () => {

      let page = parseInt(req.query.page);

      if (!page) page = 1;

      let { limit } = req.query;

      if (!limit) limit = 4;

      const { searchQuery } = req.query;
      let query = {};

      if (searchQuery) {
        query.title = { $regex: searchQuery, $options: "i" };
      }
    

      let productsMongoDB = await productsModel.paginate(query,{sort: { price : 1 },page,limit:limit,  lean:true})

     

      productsMongoDB.prevLink = productsMongoDB.hasPrevPage
        ? `http://localhost:8080/productos?page=${productsMongoDB.prevPage}`
        : "";
      productsMongoDB.nextLink = productsMongoDB.hasNextPage
        ? `http://localhost:8080/productos/?page=${productsMongoDB.nextPage}`
        : "";
      productsMongoDB.isValid = !(page <= 0 || page > productsMongoDB.totalPages);

      res.render("productsList", { ...productsMongoDB,
    user: req.user });  }
    )}
    catch (error) {
      console.log("No se pudo conectar con MONGODB " + error);
      res.status(500).send("No se pudo obtener la lista de productos");
    }
  }  

  async addProduct(req, res) {
    try {
      let { title, description, price, thumbnail, code, stock, status } =
        req.body;
      let product = await productManager.addProduct({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
      });
      x 
      res.status(200).send(product)
    } catch (error) {
      console.log("No se pudo agregar el producto " + error);
      response.status(500).send("No se pudo agregar el producto");
    }
  }

  async updateProduct(req, res) {
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
  }

  async deleteProduct(req, res) {
    try {
      let product = await productManager.deleteProduct(req.params.pid);
      res.status(200).send("Producto eliminado con éxito");
    } catch (error) {
      console.log("Error al eliminar el producto: " + error);
      res.status(500).send("Error al eliminar el producto");
    }
  }

  newProduct(req,res) {
    res.render('index')

  }

  deleteView (req,res) { 
    res.render('delete')

  }
}

export default ProductosRouter;
