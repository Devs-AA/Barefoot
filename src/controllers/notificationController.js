import Service from '../services/notificationService';
import Response from '../utils/response';

const response = new Response();
/**
 * @description A class for notifications
 */
export default class Notification {
/**
 *
 * @param {obj} req request obj
 * @param {obj} res response obj
 * @param {func} next next method
 * @returns {obj} returns an object
 */
  static async unsubscribeEmailNotification(req, res, next) {
    const { id } = req.user;
    const userUnsubcribed = await Service.unsubscribeEmailNotification(id);
    if (!userUnsubcribed) {
      return next(userUnsubcribed);
    }
    response.setSuccess(200, 'You have successfully unsubscribed from email notifications');
    return response.send(res);
  }
}
