import  express  from 'express';
// const ProductManager = require('../ProductManager.js')
// const productManager = new ProductManager('data.json')
import productsRouters from './routes/products.use.js'
const app = express();
const PORT = 8080

// preparar la configuracion del servidor para recibir archivos json
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use("/api/products", productsRouters)




app.listen(PORT, ()=>{
    console.log(`server run on port ${PORT}`)
})






















// app.get("/products", async  (req, res)=>{
//     const products =  await productManager.getProducts()
//     const {limit} = req.query

//     if (limit) return res.json(products.slice(0,limit))
//     else return res.json(products)

   
// })


// app.get("/products/:pid", async  (req,res)=>{
//     const products = await productManager.getProducts()
//     const idProduct =  req.params.pid
//     const product =   products.find(obj => obj.id === parseInt(idProduct))

    

//     if (product) return res.status(200).json(product)
//     else return res.status(404).json({message: "product dont exist"})
    
   
 
// })  