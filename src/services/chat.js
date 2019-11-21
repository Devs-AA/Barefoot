import { io } from '../config/socket';

const chatUp = () => io.on('connection', (socket) => {
  socket.emit('new-user', socket);
  socket.on('disconnect', () => console.log('disconnected2'));
  socket.on('new-message', (data) => {
    socket.broadcast.emit('new-chat-message', data);
  });
});

export default chatUp;
