import { io } from '../config/socket';
import { chats } from '../models';

const chatUp = () => io.on('connection', (socket) => {
  socket.on('new-user', (info) => {
    socket.user = info;
  });
  socket.on('new-message', async (data) => {
    socket.broadcast.emit('new-chat-message', data);
    await chats.create(data);
  });
  socket.on('keydown', () => {
    socket.broadcast.emit('typing', `${socket.user.username} is typing`);
  });
  socket.on('keyup', () => {
    socket.broadcast.emit('stopped-typing', '');
  });
});

export default chatUp;
