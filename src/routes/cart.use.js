import { Router } from "express";
const router = Router();
import fs from "fs";
import { cartsModel } from "../models/cart.model.js";
import { productsModel } from "../models/products.model.js";
import { createBrotliCompress } from "zlib";

// const createCart = () =>{
//     fs.writeFileSync('cart.json', JSON.stringify(carts))
//     return readFilecart()
// }

// const readFilecart = ()  =>{
//     const content = fs.readFileSync('cart.json', 'utf-8')
//     const parseContent = JSON.parse(content)

//     return parseContent
// }
// const readFileproducts = ()  =>{
//     const content = fs.readFileSync('data.json', 'utf-8')
//     const parseContent = JSON.parse(content)

//     return parseContent
// }

// let carts = readFilecart()

// router.get("/:cid", async(req, res)=>{
// let carts = await readFilecart()
// const cidProduct =  req.params.cid
// if  (!carts.find((obj) => obj.id === parseInt(cidProduct))) res.status(400).send({ status: "Error", message: "CID invalido de carrito" });
// const cart =  carts.find(obj => obj.id === parseInt(cidProduct))

// if (cart) return res.status(200).json(cart)
// else return res.status(404).json({message: "cart dont exist"})

// })

router.post("/", async (req, res) => {
  // carts.push(productsToAgree)
  // res.send(createCart())

  let cartCreate = {
    products: [],
  };

  try {
    let cart = await cartsModel.create(cartCreate);
    res.send(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  //     let carts = await readFilecart()
  // const cidProduct =  req.params.cid
  // if  (!carts.find((obj) => obj.id === parseInt(cidProduct))) res.status(400).send({ status: "Error", message: "CID invalido de carrito" });
  // const cart =  carts.find(obj => obj.id === parseInt(cidProduct))

  // let products = await readFileproducts()
  // const pidProduct = req.params.pid
  // if (!products.find((obj)=> obj.id ===parseInt (pidProduct))) res.status(400).send({status: "producto no encontrado"})
  // const product = products.find (obj => obj.id === parseInt(pidProduct))

  // let productsToAgree= {
  //     product: product.id,
  //     quantity: 1
  // }

  // if(cart.products.find((obj)=> obj.product === productsToAgree.product)) cart.products.find((obj) => obj.quantity++)

  // else{
  //     cart.products.push(productsToAgree)
  // }
  // fs.writeFileSync('cart.json', JSON.stringify(carts))

  // res.send(cart)

  let cartsMongoDB = async () => {
    await cartsModel.find();
  };
  const cidProduct = req.params.cid;
  const cart = await cartsModel.findOne({ _id: cidProduct }, "products");
  console.log(`el carrito ${cart} llego con exito `);

  const pidProduct = req.params.pid;
  let productM = await productsModel.find({ _id: pidProduct });

  const idAgree = productM.find((x) => x._id);

  let productsToAgree = {
    product: idAgree._id,
    quantity: 1,
  };
  cart.products.push(productsToAgree);

  cart.save();

  console.log(" el producto fue agregado con exito");

  res.status(200).send(cart);
});

export default router;
