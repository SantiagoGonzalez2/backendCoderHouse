import { Server as SocketIO } from 'socket.io';

export default function initializeSocket(server) {
  const io = new SocketIO(server);

  io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    socket.on('chat:message', (message) => {
      socket.emit('chat:message1', message);
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}


