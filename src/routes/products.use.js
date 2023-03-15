import { Router } from 'express'
const router = Router()
import ProductManager from '../../ProductManager.js'

const productManager = new ProductManager()


let products = productManager.getProducts()

router.get("/", async  (req, res)=>{
    // const products =  await productManager.getProducts()
    const {limit} = req.query

    if (limit) return res.json(products.slice(0,limit))
    else return res.json(products)

   
})


router.get("/:pid", async  (req,res)=>{
    const products = await productManager.getProducts()
    const idProduct =  req.params.pid
    const product =   products.find(obj => obj.id === parseInt(idProduct))

    

    if (product) return res.status(200).json(product)
    else return res.status(404).json({message: "product dont exist"})
    
   
 
})  
router.post('/', async (request, response) => {
    
    let product = request.body;
    product.id = Math.floor(Math.random() * 20 + 1);
    if (!product.title || !product.description || !product.price ||

        !product.thumbnail || !product.code || !product.stock)  {
        console.error("Faltan campos");
        console.error(product);
        response.status(400).send({ status: "Error", message: "Producto no valido. Falta completar campos" });
    } else {
        products.push(product);
        productManager.addProducts(product)
        productManager.addToData()
       
        console.log(product);
        response.send({ status: "Success", message: `Producto agregado con exito, con ID: ${product.id}` });
    }
});

router.put("/:pid", async  (req,res)=>{
    
    const idProduct =  parseInt(req.params.pid)
    const productUpdate = req.body
    const productPosition =   products.find (obj => obj.id === idProduct)
    
    products[productPosition] = productUpdate

    res.send({message: "update"})    
})  

router.delete('/:pid', (request, response) => {
    
    let pid = parseInt(request.params.userId);
    
 
    const userPosition = products.find((u => u.id === pid));
   
    
    products.splice(userPosition, 1);
    
    return response.send({ status: "Success", message: "Usuario Eliminado." }); //Si no se indica retorna status HTTP 200OK.
});



export default router