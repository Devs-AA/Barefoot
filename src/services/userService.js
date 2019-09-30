/* eslint-disable no-useless-catch */
import db from '../models/index';

const { users } = db;
/**
 * @param { class } provide response to user signup activity.
 */
class userService {
  /**
   * @param { newUser } newUser to be added to user table.
 * @returns {object} containing newly added user to the database
 */
  static async addUser(newUser) {
    try {
      return await db.users.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { token } token to be added to logout table.
 * @returns {object} containing newly added user to the database
 */
  static async logout(token) {
    try {
      return await db.logouts.create({ invalidToken: token });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { email } email of newly registered to be added to login table.
   * @param { userlogged } userlogged of newly registered to be added to login table.
 * @returns {object} containing newly added user to login table.
 */
  static async addLogin(email, userlogged) {
    try {
      const userToLogin = await db.users.findOne({
        where: { email }
      });

      if (userToLogin) {
        const createdLoginUser = await db.logins.create(userlogged);
        return createdLoginUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { invalidToken } invalidToken to check in database.
 * @returns {object} containing newly added user to login table.
 */
  static async checkInvalidToken(invalidToken) {
    try {
      const token = await db.logouts.findOne({
        where: { invalidToken }
      });
      return token;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { email } email of user to be updated.
   * @param { updateUser } updateUser of user to be updated.
 * @returns {object} object containing recently details of user.
 */
  static async updateUserByEmail(email, updateUser) {
    try {
      const userToUpdate = await db.users.findOne({
        where: { email },
      });

      if (userToUpdate) {
        await db.users.update(updateUser, { where: { email } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @static
   * @param {string} email
   * @returns {string} loginAUser
   */
  static async findUserInUsersDb(email) {
    try {
      const loggedUser = await db.users.findOne({
        where: {
          email
        }
      });
      return loggedUser;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} email
   * @returns {string} findLastLogin
   */
  static async findUserInLoginsDb(email) {
    try {
      const lastLogin = await db.logins.findOne({
        where: {
          email
        }
      });
      return lastLogin;
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} addUser
   * @returns {string} addLoggedInUser
   */
  static async addUserInLogins(addUser) {
    try {
      return await db.logins.create(addUser);
    } catch (error) {
      return error.message;
    }
  }

  /**
   * @static
   * @param {string} addUser
   * @returns {string} addLoggedInUser
   */
  static async updateLogins(addUser) {
    try {
      return await db.logins.update({
        where: {
          email: addUser.email
        }
      });
    } catch (error) {
      return error.message;
    }
  }

  /**
* Helper function to find a user by id
* @param {Integer} id - user's id
* @returns {Promise} - sequelize response
*/

  static async findUserById(id) {
    try {
      const user = await users.findOne({
        where: { id },
        attributes: {
          exclude: ['isVerified', 'saveProfile']
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
 * Helper function to find and update user
 * @returns {Promise} - sequelize response
 * @param {Integer} id - user's id
 * @param {Object} user
*/
  static async updateUser(id, user) {
    try {
      const userToUpdate = await users.findOne({
        where: { id }
      });
      if (userToUpdate) {
        const newProfile = await db.users.update(user, {
          where: { id },
          attributes: {
            exclude: ['firstName']
          },
          returning: true,
        });
        return newProfile[1][0].dataValues;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default userService;
