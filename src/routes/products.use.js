import { Router } from 'express'
import { productsModel } from '../models/products.model.js'
import ProductManager from '../../ProductManager.js'
// import fs from 'fs'
const router = Router()


const class1 = new ProductManager
// const readFile = ()  =>{
//     const content = fs.readFileSync('data.json', 'utf-8')
//     const parseContent = JSON.parse(content)

//     return parseContent
// }


// const addToData =() => {
//     fs.writeFileSync('data.json', JSON.stringify(products))
// }
// let products = readFile()




router.get("/", async  (req, res)=>{
    
    // const {limit} = req.query

    // if (limit) return res.json(products.slice(0,limit))
    // else return res.json(productsMongoDB)
    
        try {
            let  productsMongoDB =  await class1.getProducts()
        
        res.send (productsMongoDB)

        
        
        }
        catch(error) {
            console.log('no se pudo conectar con MONGODB ' + error);
        }


   
})



// router.get("/:pid", async  (req,res)=>{
    
//     const idProduct =  req.params.pid
//     if (!products.find((obj) => obj.id === parseInt(idProduct))) res.status(400).send({ status: "Error", message: "ID invalido" });
//     const product =   products.find(obj => obj.id === parseInt(idProduct))

    

//     if (product) return res.status(200).json(product)
//     else return res.status(404).json({message: "product dont exist"})
    
   
 
// })  



router.post('/', async (request, response) => {
    
    // let product = request.body;
    // product.id = products.length;
    // if (!product.title || !product.description || !product.price ||
    //     !product.thumbnail || !product.code || !product.stock || !product.status || products.find((obj) => obj.title === product.title))  {    
    //     response.status(400).send({ status: "Error", message: "Producto no valido. Falta completar campos para una carga correcta o es un producto con titulo  repetido" });
    // } else {
    //     products.push(product);
    //     addToData()  
    //     response.send({ status: "Success", message: `Producto agregado con exito, con ID: ${product.id}` });
   // }


try {
    let {title, description, price,thumbnail, code, stock, status     }= request.body;
    let product = await productsModel.create({title, description, price,thumbnail, code, stock, status })
    response.status(200).send('producto agregado' + product)
} 


catch (error) {
    console.log('error al crear pruducto'+ error);

}
});




router.put("/:pid", async  (req,res)=>{
    
    // const idProduct =  parseInt(req.params.pid)
    // const productUpdate = req.body
    // const updDate = products.map((product) => product.id === idProduct ?{...product, ...productUpdate} : product)
    // fs.writeFileSync('data.json', JSON.stringify(updDate, null))

    // res.send({message: " product update"}) 

    
    try {
        const productUpdate = req.body

        let product = await productsModel.updateOne({_id:req.params.pid}, productUpdate)
        res.status(202).send(product + 'producto actualizado')





    }catch (error){

        console.log('no se pudo actualizar el producto' + error);

    }
    
})  




router.delete('/:pid', async  (request, response) => {
    
    // let pid = request.params.pid
    // const userPosition = products.filter((product) => product.id !== parseInt(pid))

    // fs.writeFileSync('data.json', JSON.stringify(userPosition, null))
    
    // return response.send({ status: "Success", message: "Producto eliminado" });

 try {
    

    let ProductDelete = await productsModel.deleteOne({_id: request.params.pid})

    response.status(200).send('borrado con exito')



 }catch(error){
    console.log("error al borrar" + error)
 }



    




});






export default router