import { users, notifications } from '../models';
import { checkIfExistsInDb } from '../utils/searchDb';
import { newRequestNotificationMail } from './mail/notificationMail';
/**
 * @description A class for notifications
 */
class Notification {
/**
 *
 * @param {int} userId Id of the user creating request
 * @param {*} managerId The Id of the manager of the user creating request
 * @param {*} newNotification Notification oject
 * @returns {bool} returns boolean
 */
  static async createEmailNotification(userId, managerId, newNotification) {
    const { emailNotification } = await checkIfExistsInDb(users, userId, '');
    if (!emailNotification) {
      return false;
    }
    try {
      await notifications.create(newNotification);
      const { email } = await checkIfExistsInDb(users, managerId, '');
      const msg = 'Hello, your direct report has made a new travel request. The request is awaiting your decision';
      await newRequestNotificationMail(email, msg);
      return true;
    } catch (error) {
      error.status(500);
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
