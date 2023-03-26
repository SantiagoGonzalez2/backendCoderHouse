import  express  from 'express';
import productsRouters from './routes/products.use.js'
import cartRouters from './routes/cart.use.js'
import viewRouters from './view/productsView.use.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import {Server} from 'socket.io';





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
app.use(express.static(__dirname +'/public'));






app.use("/api/products", productsRouters)

app.use("/api/cart", cartRouters)

app.use("/views/products", viewRouters)


//apreton de manos 

socketServer.on('connection', socket=>{
    console.log('Nuevo cliente conectado!')

    socket.on('mensaje', data =>{
        console.log("llega");
        console.log(data)
    })



})
   


















