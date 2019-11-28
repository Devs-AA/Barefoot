import { users, notifications } from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import { newRequestNotificationMail } from './mail/notificationMail';

const newRequestMessage = 'Hello, your direct report has made a new travel request. The request is awaiting your decision';
/**
 * @description A class for notifications
 */
class Notification {
  /**
 *
 * @param {*} newNotification Notification oject
 * @returns {bool} returns boolean
 */
  static async create(newNotification) {
    try {
      const { dataValues } = await notifications.create(newNotification);
      return dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
 *
 * @param {*} recipientId The Id of the receiver of the mail
 * @param {*} notification Notification object
 * @param {*} msg message to be displayed in the email
 * @returns {bool} returns boolean
 */
  static async createEmailNotification(recipientId, notification, msg = newRequestMessage) {
    const { emailNotification, email } = await checkIfExistsInDb(users, recipientId, '');
    try {
      await Notification.create(notification);
      if (!emailNotification) {
        return false;
      }
      await newRequestNotificationMail(email, msg);
      return true;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {int} id  id of the user to unsubscribe from email notification
     * @returns {bool} returns a boolean
     */
  static async unsubscribeEmailNotification(id) {
    const unSubscribedUser = await users.update({ emailNotification: false }, {
      returning: true,
      plain: true,
      where: {
        id
      }
    });
    if (unSubscribedUser[1].dataValues) {
      return true;
    }
    return false;
  }
}

export default Notification;
