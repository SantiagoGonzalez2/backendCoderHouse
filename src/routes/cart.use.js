
import { Router } from 'express'
const router = Router()
import fs from 'fs'

const createCart = () =>{
    fs.writeFileSync('cart.json', JSON.stringify(carts))
    return readFilecart()
}

const readFilecart = ()  =>{
    const content = fs.readFileSync('cart.json', 'utf-8')
    const parseContent = JSON.parse(content)

    return parseContent
}
const readFileproducts = ()  =>{
    const content = fs.readFileSync('data.json', 'utf-8')
    const parseContent = JSON.parse(content)

    return parseContent
}

let carts = readFilecart()


router.get("/:cid", async(req, res)=>{
let carts = await readFilecart()
const cidProduct =  req.params.cid
if  (!carts.find((obj) => obj.id === parseInt(cidProduct))) res.status(400).send({ status: "Error", message: "CID invalido de carrito" });
const cart =  carts.find(obj => obj.id === parseInt(cidProduct))



if (cart) return res.status(200).json(cart)
else return res.status(404).json({message: "cart dont exist"})
    
})

router.post("/", (req,res) =>{
    let productsToAgree = {
        id :Math.floor( Math.random() *100 +2),
        products : [ ]
    }
    
    carts.push(productsToAgree)
    res.send(createCart())
})



router.post ("/:cid/product/:pid", async (req,res)=>{


    
    let carts = await readFilecart()
const cidProduct =  req.params.cid
if  (!carts.find((obj) => obj.id === parseInt(cidProduct))) res.status(400).send({ status: "Error", message: "CID invalido de carrito" });
const cart =  carts.find(obj => obj.id === parseInt(cidProduct))



let products = await readFileproducts()
const pidProduct = req.params.pid 
if (!products.find((obj)=> obj.id ===parseInt (pidProduct))) res.status(400).send({status: "producto no encontrado"})
const product = products.find (obj => obj.id === parseInt(pidProduct))

let productsToAgree= {
    product: product.id,
    quantity: 1
}

// !cart.products.product === productsToAgree.id ?cart.products.push(productsToAgree) :  cart.products.quantity ++



cart.products.push(productsToAgree)


carts.push(cart)

fs.writeFileSync('cart.json', JSON.stringify(carts))

res.send(cart)


})


export default router



