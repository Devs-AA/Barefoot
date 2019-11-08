import { isArray } from 'util';
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
 * @param {int} userId Id of the user creating request
 * @param {*} managerId The Id of the manager of the user creating request
 * @param {*} notification Notification object
 * @param {*} msg message to be displayed in the email
 * @returns {bool} returns boolean
 */
  static async createEmailNotification(userId, managerId, notification, msg = newRequestMessage) {
    const { emailNotification } = await checkIfExistsInDb(users, userId, '');
    try {
      await Notification.create(notification);
      if (!emailNotification) {
        return false;
      }
      const { email } = await checkIfExistsInDb(users, managerId, '');
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

  /**
   *
   * @param {*} userId The id of the user
   * @returns {array} returns an array of updated notiications
   */
  static async readAll(userId) {
    const [, notification] = await notifications.update({ isRead: true }, {
      returning: true,
      where: {
        recipientId: userId,
        isRead: false
      }
    });
    return isArray(notification) ? notification : [notification.dataValues];
  }
}

export default Notification;
