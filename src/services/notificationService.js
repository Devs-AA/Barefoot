import { users } from '../models';
/**
 * @description A class for notifications
 */
class Notification {
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
