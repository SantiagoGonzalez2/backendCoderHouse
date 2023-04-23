import { Router } from "express";
const router = Router();
import { cartsModel } from "../models/cart.model.js";
import { productsModel } from "../models/products.model.js";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;


// router.post("/", async (req, res) => {

//   let cartCreate = {
//     products: [],
//   };

//   try {
//     let cart = await cartsModel.create(cartCreate);
//     res.send(cart);
//   } catch (error) {
//     console.log(error);
//   }
// });


// router.post("/:cid/product/:pid", async (req, res) => {
  
// try{
//   const cidCart = req.params.cid;
//   const cart = await cartsModel.findOne({ _id: cidCart }, "products");
//   console.log(`el carrito ${cart} llego con exito `);

//   const pidProduct = req.params.pid;
//   let productM = await productsModel.find({ _id: pidProduct });

//   const idAgree = productM.find((x) => x._id);

//   let productsToAgree = {
//     product: idAgree._id,
//     quantity: 1,
//   };
//   cart.products.push(productsToAgree);

 
//    await  cart.save();

//   console.log(" el producto fue agregado con exito");

//   res.status(200).send(cart);
// }catch(err){
//   console.log("no se agrego el producto al carrito" + err);
// }
// });

// router.delete("/:cid/products/:pid", async (req,res) =>{
//   try {
//     const cidCart = req.params.cid;
//     const cart = await cartsModel.findOne({ _id: cidCart }, 'products');
//     const pidProduct = req.params.pid;
//     const pidObjectId = new ObjectId(pidProduct)

//     const productIndex = cart.products.findIndex(product => product.product.equals(pidObjectId));

//     if (productIndex !== -1) {
//       cart.products.splice(productIndex, 1);
//       await cart.save();
//       res.status(201).send({message: 'producto borrado de carrito'});
//     } else {
//       res.status(404).send({message: 'No se encontró el producto en el carrito'});
//     }

//   } catch(err) {
//     console.log("el producto no se eliminó del carrito" + err);
//     res.status(500).send({message: 'Ocurrió un error al eliminar el producto del carrito'});
//   }
// });




// router.delete("/:cid", async (req,res) =>{
//   try {
//     const cidCart = req.params.cid;
//     await cartsModel.updateOne({ _id: cidCart }, { products: [] });
//     res.status(201).send({message: 'Carrito vaciado'});
//   } catch(err) {
//     console.log("Ocurrió un error al vaciar el carrito" + err);
//     res.status(500).send({message: 'Ocurrió un error al vaciar el carrito'});
//   }
// });



// router.put("/:cid/products/:pid", async (req, res) => {
//   try {
//     const cidCart = req.params.cid;
//     const pidProduct = req.params.pid;
//     const pidObjectId = new ObjectId(pidProduct);

//     const cart = await cartsModel.findOne({ _id: cidCart });
//     const product = cart.products.find((prod) => prod.product.equals(pidObjectId));

//     if (product) {
//       const newQuantity = req.body.quantity;
//       product.quantity = newQuantity;
//       await cart.save();
//       res.status(200).send({ message: "Cantidad actualizada correctamente" });
//     } else {
//       res.status(404).send({ message: "Producto no encontrado en el carrito" });
//     }
//   } catch (err) {
//     console.log("Error al actualizar la cantidad: " + err);
//     res.status(500).send({ message: "Ocurrió un error al actualizar la cantidad del producto" });
//   }
// });

// router.get("/:cid", async (req, res) => {
//   try {
//     const cidCart = req.params.cid;
//     const cart = await cartsModel.findOne({ _id: cidCart}).populate('products.product').lean();
//     if (cart) {
//       // res.status(200).send(cart);
//       // console.log(cart);
//       res.render('cart',  {cart});
//     } else {
//       res.status(404).send({ message: "No se encontró el carrito" });
//     }
//   } catch (err) {
//     console.log("Error al buscar el carrito: " + err);
//     res.status(500).send({ message: "Ocurrió un error al buscar el carrito" });
//   }
// });



import CartManager from "../../CartManager.js";

const cartManager = new CartManager();

// Crear un nuevo carrito
router.post("/", async (req, res) => {
  try {
    const cart = await cartManager.createCart();
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
});

// Agregar un producto al carrito
router.post("/:cid/product/:pid", async (req, res) => {
  const cidCart = req.params.cid;
  const pidProduct = req.params.pid;

  try {
    const cart = await cartManager.addProduct(cidCart, pidProduct);
    console.log("El producto fue agregado con éxito");
    res.status(200).send(cart);
  } catch (err) {
    console.log("No se pudo agregar el producto al carrito: " + err);
    res.status(500).send({ message: "Ocurrió un error al agregar el producto al carrito" });
  }
});

// Eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  const cidCart = req.params.cid;
  const pidProduct = req.params.pid;

  try {
    const cart = await cartManager.removeProduct(cidCart, pidProduct);
    console.log("El producto fue eliminado del carrito con éxito");
    res.status(201).send({ message: "Producto borrado del carrito" });
  } catch (err) {
    console.log("No se pudo eliminar el producto del carrito: " + err);
    res.status(500).send({ message: "Ocurrió un error al eliminar el producto del carrito" });
  }
});

// Vaciar el carrito
router.delete("/:cid", async (req, res) => {
  const cidCart = req.params.cid;

  try {
    await cartManager.emptyCart(cidCart);
    console.log("El carrito fue vaciado con éxito");
    res.status(201).send({ message: "Carrito vaciado" });
  } catch (err) {
    console.log("Ocurrió un error al vaciar el carrito: " + err);
    res.status(500).send({ message: "Ocurrió un error al vaciar el carrito" });
  }
});

// Actualizar la cantidad de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  const cidCart = req.params.cid;
  const pidProduct = req.params.pid;
  const newQuantity = req.body.quantity;

  try {
    const cart = await cartManager.updateQuantity(cidCart, pidProduct, newQuantity);
    console.log("La cantidad del producto fue actualizada con éxito");
    res.status(200).send({ message: "Cantidad actualizada correctamente" });
  } catch (err) {
    console.log("No se pudo actualizar la cantidad del producto: " + err);
    res.status(500).send({ message: "Ocurrió un error al actualizar la cantidad del producto" });
  }
});

// Obtener un carrito por ID
router.get("/:cid", async (req, res) => {
  const cidCart = req.params.cid;

  try {
    const cart = await cartManager.getCartById(cidCart);
    if (cart) {
      res.render('cart', { cart });
    } else {
      res.status(404).send({ message: "No se encontró el carrito" });
    }} catch (error) {
      console.log("Error al buscar el carrito: " + error);
      res.status(500).send({ message: "Ocurrió un error al buscar el carrito" });
      }
      });
 

  




export default router;
