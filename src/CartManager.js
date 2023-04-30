// import {cartsModel} from './models/cart.model.js';

// import {productsModel} from './models/products.model.js';




// import { Types } from 'mongoose';

// const { ObjectId } = Types;

// class CartManager {
//   constructor() {}

//   async createCart() {
//     let cartCreate = {
//       products: [],
//     };

//     try {
//       let cart = await cartsModel.create(cartCreate);
//       return cart;
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   async addProductToCart(cid, pid) {
//     try {
//       const cart = await cartsModel.findOne({ _id: cid }, "products");
//       const productM = await productsModel.find({ _id: pid });

//       const idAgree = productM.find((x) => x._id);

//       let productsToAgree = {
//         product: idAgree._id,
//         quantity: 1,
//       };
//       cart.products.push(productsToAgree);

//       await cart.save();

//       console.log("el producto fue agregado con exito");
//       return cart;
//     } catch (err) {
//       console.log("no se agrego el producto al carrito" + err);
//     }
//   }

//   async removeProductFromCart(cid, pid) {
//     try {
//       const cart = await cartsModel.findOne({ _id: cid }, 'products');
//       const pidObjectId = new ObjectId(pid)

//       const productIndex = cart.products.findIndex(product => product.product.equals(pidObjectId));

//       if (productIndex !== -1) {
//         cart.products.splice(productIndex, 1);
//         await cart.save();
//         console.log('producto borrado de carrito');
//         return cart;
//       } else {
//         console.log('No se encontró el producto en el carrito');
//         return null;
//       }

//     } catch(err) {
//       console.log("el producto no se eliminó del carrito" + err);
//     }
//   }

//   async removeAllProductsFromCart(cid) {
//     try {
//       await cartsModel.updateOne({ _id: cid }, { products: [] });
//       console.log('Carrito vaciado');
//     } catch(err) {
//       console.log("Ocurrió un error al vaciar el carrito" + err);
//     }
//   }

//   async updateProductQuantity(cid, pid, newQuantity) {
//     try {
//       const pidObjectId = new ObjectId(pid);

//       const cart = await cartsModel.findOne({ _id: cid });
//       const product = cart.products.find((prod) => prod.product.equals(pidObjectId));

//       if (product) {
//         product.quantity = newQuantity;
//         await cart.save();
//         console.log("Cantidad actualizada correctamente");
//         return cart;
//       } else {
//         console.log("Producto no encontrado en el carrito");
//         return null;
//       }
//     } catch (err) {
//       console.log("Error al actualizar la cantidad: " + err);
//     }
//   }

//   async getCartById(cid) {
//     try {
//       const cart = await cartsModel.findOne({ _id: cid }).populate('products.product').lean();
//       if (cart) {
//         return cart;
//       } else {
//         console.log("No se encontró el carrito");
//         return null;
//       }
//     } catch (err) {
//       console.log("Error al buscar el carrito: " + err);
//     }
//   }
// }

// export default CartManager;
