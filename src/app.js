import  express  from 'express';
import productsRouters from './routes/product/products.use.js'
import cartRouters from './routes/cart/cart.use.js'
import handlebars from 'express-handlebars'
import __dirname from './utils.js'
import productList from './routes/product/productView.use.js'
import userRouters from './routes/user/user.use.js'
import chatRouter from './routes/chat/chat.use.js'
import mockRouter from './routes/mock/mocking.use.js'
import passport from 'passport';
import initializePassport from './config/passport.config.js';
import usersViewRouter from './routes/user/userView.use.js'
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import { connectToMongoDB } from './db/database.js';
import initializeSocket from './socket/chat.js'
import logger from './routes/loggers/loggers.use.js'
import { options } from './docs/config/swagger.js';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';





// express SERVER //
const app = express();
const PORT = config.port
const httpServer = app.listen(PORT, ()=> {
    console.log(`server run on port ${PORT}`)
})

//  mongo BBDD //
connectToMongoDB();

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

app.use ("/views", productList)

app.use("/api/sessions/", userRouters)

app.use('/users',usersViewRouter);

app.use('/msg', chatRouter)

app.use('/api', mockRouter)

app.use('/api', logger)

//swagger


const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));







// endpoints erroneos
app.all('*', (req, res) => {
    res.status(404).json({ error: 'La ruta solicitada no existe' });
  });

;


// SOCKET //


initializeSocket(httpServer);

