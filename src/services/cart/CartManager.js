import {cartsModel} from '../../db/models/cart.model.js';
import ProductManager from '../product/ProductManager.js';
import { Types } from 'mongoose';

const { ObjectId } = Types;

const Pmanager = new ProductManager()

class CartManager {
  constructor() {}

  async createCart() {
    let cartCreate = {
      products: [],
    };

    try {
      let cart = await cartsModel.create(cartCreate);
      return cart;
    } catch (error) {
      console.log(error);
    }
  }


async addProductToCart(cid, pid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid });
      const product = await Pmanager.getProductById({_id: pid})
  
      if (!product) {
        throw new Error("Producto no encontrado");
      }
     
  
      const existingProduct = cart.products.find((p) => p.product.equals(pid));
  
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.products.push({
          product: product._id,
          quantity: 1,
        });
       
      }
     
      await product.save();
  
      await cart.save();
      console.log("El producto fue agregado con éxito");
      return cart;
    } catch (err) {
      console.log("No se pudo agregar el producto al carrito: " + err);
      throw err;
    }
  }
  

  async removeProductFromCart(cid, pid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid }, 'products');
      const pidObjectId = new ObjectId(pid)

      const productIndex = cart.products.findIndex(product => product.product.equals(pidObjectId));

      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        console.log('producto borrado de carrito');
        return cart;
      } else {
        console.log('No se encontró el producto en el carrito');
        return null;
      }

    } catch(err) {
      console.log("el producto no se eliminó del carrito" + err);
    }
  }

  async removeAllProductsFromCart(cid) {
    try {
      await cartsModel.updateOne({ _id: cid }, { products: [] });
      console.log('Carrito vaciado');
    } catch(err) {
      console.log("Ocurrió un error al vaciar el carrito" + err);
    }
  }

  async updateProductQuantity(cid, pid, newQuantity) {
    try {
      const pidObjectId = new ObjectId(pid);

      const cart = await cartsModel.findOne({ _id: cid });
      const product = cart.products.find((prod) => prod.product.equals(pidObjectId));

      if (product) {
        product.quantity = newQuantity;
        await cart.save();
        console.log("Cantidad actualizada correctamente");
        return cart;
      } else {
        console.log("Producto no encontrado en el carrito");
        return null;
      }
    } catch (err) {
      console.log("Error al actualizar la cantidad: " + err);
    }
  }

  async getCartById(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid }).populate('products.product').lean();
      if (cart) {
        return cart;
      } else {
        console.log("No se encontró el carrito");
        return null;
      }
    } catch (err) {
      console.log("Error al buscar el carrito: " + err);
    }
  }
  async totalA(cid) {
    try {
      const cart = await cartsModel.findOne({ _id: cid }).populate('products.product');
      
      let totalAmount = 0;
      for (const product of cart.products) {
        const price = product.product.price
        const quantity = product.quantity;
        totalAmount += price * quantity;
      }
      
      return totalAmount;
    } catch (error) {
      console.error('Error al calcular el monto total:', error);
      throw new Error('Error al calcular el monto total');
    }
  }
}

export default CartManager;
