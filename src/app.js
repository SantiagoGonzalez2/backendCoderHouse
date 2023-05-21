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
import userRouters from './routes/user.use.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import usersViewRouter from './routes/userView.use.js'
import cookieParser from 'cookie-parser';
import config from './config/config.js';
/// probado herencia 
import ProductosRouter from './routes/custom/products.extend.router.js';
import usuarioRoutes from './routes/custom/users.extend.router.js';
import CarritoRoutes from './routes/custom/cart.extend.router.js';

const productosRouter = new ProductosRouter();
const usuariosRouter = new usuarioRoutes()
const carritoRouter = new CarritoRoutes()


const class1 = new productManager()
// express SERVER //
const app = express();
const PORT = config.port
const httpServer = app.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
})



// socket //
const socketServer = new Server(httpServer);


//  mongo BBDD //
const DB = config.mongoUrl
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


// Middleware  para recibir archivos json dentro del server
app.use(express.urlencoded({extended:true}))
app.use(express.json())


// handlebars //
  
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + "/view");
app.set('view engine', 'handlebars');

// public //
app.use(express.static(__dirname +"/public"));

// cookie //

app.use(cookieParser('micookie'))


// Middlewares Passport //
initializePassport();
app.use(passport.initialize());

  

//// rutas declaradas ////

app.use("/api/products", productsRouters)

app.use("/api/cart", cartRouters)

app.use("/views/", viewRouters)

app.use ("/views", deleteRouters)

app.use ("/views", productList)

app.use("/api/sessions/", userRouters)

app.use('/users',usersViewRouter);

//// probando herencia//////

app.use('/productos', productosRouter.getRouter())
app.use('/usuarios' ,usuariosRouter.getRouter())
app.use('/carrito', carritoRouter.getRouter())

// endpoints erroneos
app.all('*', (req, res) => {
    res.status(404).json({ error: 'La ruta solicitada no existe' });
  });



//apreton de manos  SOCKET //

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!')

socket.on('data',  data =>{   
    class1.addProduct(data)
})
socket.on("IDdelete", data=>{  
    class1.deleteProduct(data)
    socket.emit("borrado",data)
})
const sendProducts = async()=>{
    let productsMongoDB = await class1.getAllProducts()
    socket.emit('products', productsMongoDB)
}
sendProducts()
})

  
    


