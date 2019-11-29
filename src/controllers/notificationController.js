import webPush from 'web-push';
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

  /**
 *
 * @param {obj} body => message to be sent to front end and the suvscription received from front end
 * @returns {obj} returns an object
 */
  static async notify(body) {
    const { PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY } = process.env;
    await webPush.setVapidDetails('mailto:walesadeks@gmail.com', PUBLIC_VAPID_KEY, PRIVATE_VAPID_KEY);
    const { subscription, message } = body;
    try {
      const payload = JSON.stringify({
        title: 'New Travel Request',
        body: message
      });
      await webPush.sendNotification(subscription, payload);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
*
* @param {obj} req request obj
* @param {obj} res response obj
* @param {func} next next method
* @returns {obj} returns an object
*/
  static async readAll(req, res, next) {
    const { id } = req.user;
    try {
      const readNotifications = await Service.readAll(id);
      return res.status(200).json({
        success: true,
        data: readNotifications
      });
    } catch (error) {
      next(error);
    }
  }
}
