import { io } from '../config/socket';

class Chat {
  static async start() {
    io.on('connection', () => console.log('Connected'));
    io.emit('here', 'Now');
    io.on('connection', (skt) => {
      console.log('Connected on this end');
      skt.emit('here', 'Now');
    });
  }
}

export default Chat;
