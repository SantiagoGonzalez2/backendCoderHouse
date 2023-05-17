import CartManager from "../../CartManager.js";
import CustomRouter from "./customRouter.js";
const cartManager = new CartManager();
import passport from "passport";






class CarritoRoutes extends CustomRouter {
    constructor() {
      super();
      this.router.post("/", this.createCart);
      this.router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), this.addProductToCart);
      this.router.delete("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), this.removeProductFromCart);
      this.router.delete("/:cid", passport.authenticate("jwt", { session: false }), this.removeAllProductsFromCart);
      this.router.put("/:cid/products/:pid", passport.authenticate("jwt", { session: false }), this.updateProductQuantity);
      this.router.get("/:cid", passport.authenticate("jwt", { session: false }), this.getCartById);
    }
  
    createCart = async (req, res) => {
      try {
        const cart = await cartManager.createCart();
        res.send(cart);
      } catch (error) {
        console.log(error);
      }
    };
  
    addProductToCart = async (req, res) => {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
      const userid = req.user.cart;
  
      try {
        const cart = await cartManager.addProductToCart(userid, pidProduct);
        res.setHeader('Location', `/carrito/${userid}`);
        res.status(302).end();
      } catch (err) {
        console.log("No se pudo agregar el producto al carrito: " + err);
        res.status(500).send({ message: "Ocurrió un error al agregar el producto al carrito" });
      }
    };
  
    removeProductFromCart = async (req, res) => {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
  
      try {
        const cart = await cartManager.removeProductFromCart(cidCart, pidProduct);
        console.log("El producto fue eliminado del carrito con éxito");
        res.status(201).send({ message: "Producto borrado del carrito" });
      } catch (err) {
        console.log("No se pudo eliminar el producto del carrito: " + err);
        res.status(500).send({ message: "Ocurrió un error al eliminar el producto del carrito" });
      }
    };
  
    removeAllProductsFromCart = async (req, res) => {
      const cidCart = req.params.cid;
  
      try {
        await cartManager.removeAllProductsFromCart(cidCart);
        console.log("El carrito fue vaciado con éxito");
        res.status(201).send({ message: "Carrito vaciado" });
      } catch (err) {
        console.log("Ocurrió un error al vaciar el carrito: " + err);
        res.status(500).send({ message: "Ocurrió un error al vaciar el carrito" });
      }
    };
  
    updateProductQuantity = async (req, res) => {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
      const newQuantity = req.body.quantity;
  
      try {
        const cart = await cartManager.updateProductQuantity(cidCart, pidProduct, newQuantity);
        console.log("La cantidad del producto fue actualizada con éxito");
        res.status(200).send({ message: "Cantidad actualizada correctamente" });
      } catch (err) {
        console.log("No se pudo actualizar la cantidad del producto: " + err);
        res.status(500).send({ message: "Ocurrió un error al actualizar la cantidad del producto" });
      }
    };
  
    getCartById = async (req, res) => {
      const cidCart = req.params.cid;
  
      try {
        const cart = await cartManager.getCartById(cidCart);
        if (cart) {
          res.render('cart', { cart });
        } else {
          res.status(404).send({ message: "No se encontró el carrito" });
        }
      } catch (error) {
        console.log("Error al buscar el carrito: " + error);
        res.status(500).send({ message: "Ocurrió un error al buscar el carrito" });
      }
    };
  }
  
  export default CarritoRoutes;
  