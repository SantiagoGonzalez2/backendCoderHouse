import { Server } from 'socket.io';
import productManager from '../services/product/ProductManager.js';

const class1 = new productManager();

export function initializeSocket(httpServer) {
  const socketServer = new Server(httpServer);

  socketServer.on('connection', (socket) => {
    console.log('Nuevo cliente conectado!');

    socket.on('data', (data) => {
      class1.addProduct(data);
    });

    socket.on('IDdelete', (data) => {
      class1.deleteProduct(data);
      socket.emit('borrado', data);
    });

    const sendProducts = async () => {
      let productsMongoDB = await class1.getAllProducts();
      socket.emit('products', productsMongoDB);
    };

    sendProducts();
  });
}
