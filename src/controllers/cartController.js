import cartService from "../services/cart/cartService.js";

//--controlador--//


//crear carrito
const createCart = async (req, res) => {
  try {
    const cart = await cartService.createCart();
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
};
// agregar a carrito existente
const addProductToCart = async (req, res) => {
    try {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
      const userid = req.user.cart;
  
      const cart = await cartService.addProductToCart(userid, pidProduct);
      res.setHeader('Location', `/api/cart/${userid}`);
      res.status(302).end();
    } catch (error) {
      console.log("No se pudo agregar el producto al carrito: " + error);
      res.status(500).send('consulte stock disponible');
    }
  };

///eliminar del carrito
const removeProductFromCart = async (req, res) => {
    try {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
  
      await cartService.removeProductFromCart(cidCart, pidProduct);
  
      console.log("El producto fue eliminado del carrito con éxito");
      res.status(201).send({ message: "Producto borrado del carrito" });
    } catch (error) {
      console.log("No se pudo eliminar el producto del carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al eliminar el producto del carrito" });
    }
  };

// vaciar carrito
const removeAllProductsFromCart = async (req, res) => {
    try {
      const cidCart = req.params.cid;
  
      await cartService.removeAllProductsFromCart(cidCart);
  
      console.log("El carrito fue vaciado con éxito");
      res.status(201).send({ message: "Carrito vaciado" });
    } catch (error) {
      console.log("Ocurrió un error al vaciar el carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al vaciar el carrito" });
    }
  };

// actualizar cantidad
const updateProductQuantity = async (req, res) => {
    try {
      const cidCart = req.params.cid;
      const pidProduct = req.params.pid;
      const newQuantity = req.body.quantity;
  
      await cartService.updateProductQuantity(cidCart, pidProduct, newQuantity);
  
      console.log("La cantidad del producto fue actualizada con éxito");
      res.status(200).send({ message: "Cantidad actualizada correctamente" });
    } catch (error) {
      console.log("No se pudo actualizar la cantidad del producto: " + error);
      res.status(500).send({ message: "Ocurrió un error al actualizar la cantidad del producto" });
    }
  };
// obtener carrito
  const getCartById = async (req, res) => {
    try {
      const cidCart = req.params.cid;
  
      const cart = await cartService.getCartById(cidCart);
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


// generar orden
const generateOrder = async (req,res) =>{
  
}







export default {
  createCart,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateProductQuantity,
  getCartById
};
