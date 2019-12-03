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
    const { id, username } = req.user;
    const info = {
      userId: id,
      username
    };
    try {
      res.setHeader('user', info);
      const allChats = await chats.findAll();
      return res.status(200).json({
        success: true,
        data: allChats,
        info
      });
    } catch (error) {
      next(error);
    }
  }
}

export default Chat;
