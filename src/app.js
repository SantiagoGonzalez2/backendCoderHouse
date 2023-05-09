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

const class1 = new productManager()
// express SERVER //
const app = express();
const PORT = 8080
const httpServer = app.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
})

// socket //
const socketServer = new Server(httpServer);


//  mongo BBDD //
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



// instancia de clase //


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

  
    


