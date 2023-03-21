import { Router } from 'express'
const router = Router()
import fs from 'fs'


const readFile = ()  =>{
    const content = fs.readFileSync('data.json', 'utf-8')
    const parseContent = JSON.parse(content)

    return parseContent
}


const addToData =() => {
    fs.writeFileSync('data.json', JSON.stringify(products))
}
let products = readFile()


router.get("/", async  (req, res)=>{
    
    const {limit} = req.query

    if (limit) return res.json(products.slice(0,limit))
    else return res.json(products)

   
})


router.get("/:pid", async  (req,res)=>{
    
    const idProduct =  req.params.pid
    if (!products.find((obj) => obj.id === parseInt(idProduct))) res.status(400).send({ status: "Error", message: "ID invalido" });
    const product =   products.find(obj => obj.id === parseInt(idProduct))

    

    if (product) return res.status(200).json(product)
    else return res.status(404).json({message: "product dont exist"})
    
   
 
})  
router.post('/', async (request, response) => {
    
    let product = request.body;
    product.id = products.length;
    if (!product.title || !product.description || !product.price ||

        !product.thumbnail || !product.code || !product.stock || !product.status)  {
        console.error("Faltan completar campos");
        
        response.status(400).send({ status: "Error", message: "Producto no valido. Falta completar campos para una carga correcta" });
    } else {
        products.push(product);
        addToData()
    
       
        console.log(product);
        response.send({ status: "Success", message: `Producto agregado con exito, con ID: ${product.id}` });
    }
});

router.put("/:pid", async  (req,res)=>{
    
    const idProduct =  parseInt(req.params.pid)
    const productUpdate = req.body
    const updDate = products.map((product) => product.id === idProduct ?{...product, ...productUpdate} : product)


   
    
   
    fs.writeFileSync('data.json', JSON.stringify(updDate, null))

    res.send({message: " product update"})    
})  

router.delete('/:pid', (request, response) => {
    
    let pid = request.params.pid
    const userPosition = products.filter((product) => product.id !== parseInt(pid))

    fs.writeFileSync('data.json', JSON.stringify(userPosition, null))
    
    return response.send({ status: "Success", message: "Producto eliminado" });
});



export default router