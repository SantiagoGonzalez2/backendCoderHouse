import  express  from 'express';
import productsRouters from './routes/products.use.js'
import cartRouters from './routes/cart.use.js'
import viewRouters from './routes/form.use.js'
import deleteRouters from './routes/delete.use.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io';
import productManager from '../ProductManager.js'
import productList from './routes/productView.use.js'
import mongoose from 'mongoose';


const class1 = new productManager()


const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
})
const socketServer = new Server(httpServer);

// preparar la configuracion del servidor para recibir archivos json
app.use(express.urlencoded({extended:true}))
app.use(express.json())



// vistas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/view");
app.set('view engine', 'handlebars');

//public
app.use(express.static(__dirname +"/public"));






app.use("/api/products", productsRouters)

app.use("/api/cart", cartRouters)

app.use("/views/", viewRouters)

app.use ("/views", deleteRouters)

app.use ("/views", productList)


//apreton de manos 

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!')

socket.on('data', data =>{
    
    let products = class1.getProducts()
    data.id = products.length;
    products.push(data)
    class1.addToData(products)
    console.log(products)
})


socket.on("IDdelete", data=>{

    
    class1.deleteProduct(parseInt(data))

    console.log(" Producto borrado reysss ");





        

    


    
})

socket.emit("products", class1.getProducts())
})
   


// coneccion con mongodb

const DB = 'mongodb+srv://admin:admin@dbcoder.kj70vvc.mongodb.net/MiDBCD'



const conecctMongoDB = async ()=>{
    try {
        await mongoose.connect(DB)
        console.log('conectado con exito a mongoDB');
    }catch(error) {
        console.error('fallo la connecion a mongoDB' + error);
        process.exit()
    }
}
conecctMongoDB()














