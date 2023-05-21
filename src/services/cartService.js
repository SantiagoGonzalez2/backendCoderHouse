import CartManager from "../CartManager.js";

const cartManager = new CartManager();


//servicios

//-- crear 
const createCart = async () => {
  try {
    const cart = await cartManager.createCart();
    return cart;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
//--agregar
const addProductToCart = async (userid, productId) => {
    try {
      const cart = await cartManager.addProductToCart(userid, productId);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };


//eliminar
const removeProductFromCart = async (cidCart, pidProduct) => {
    try {
      await cartManager.removeProductFromCart(cidCart, pidProduct);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
// vaciar

const removeAllProductsFromCart = async (cidCart) => {
    try {
      await cartManager.removeAllProductsFromCart(cidCart);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

// actualizar stock tomado
const updateProductQuantity = async (cidCart, pidProduct, newQuantity) => {
    try {
      await cartManager.updateProductQuantity(cidCart, pidProduct, newQuantity);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

//obtener cart
  const getCartById = async (cidCart) => {
    try {
      const cart = await cartManager.getCartById(cidCart);
      return cart;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export default {
  createCart,
  addProductToCart,
  removeProductFromCart,
  removeAllProductsFromCart,
  updateProductQuantity,
  getCartById
};