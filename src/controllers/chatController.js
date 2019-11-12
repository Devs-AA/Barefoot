import Controller from '../services/chat';

class Chat {
  static async start(req, res, next) {
    Controller.start();
    res.send('Chat');
  }
}

export default Chat;
