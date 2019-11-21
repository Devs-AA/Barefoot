import { chats } from '../models';

/**
 * @description Chat Class
 */
class Chat {
  /**
  *
  * @param {*} req object
  * @param {*} res object
  * @param {*} next method
  * @returns {obj} response object
  */
  static async start(req, res, next) {
    const { message } = req.body;
    const { username, id } = req.user;
    const chatObj = {
      username,
      message,
      userId: id
    };
    try {
      await chats.create(chatObj);
      return res.status(200).json({});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

export default Chat;
