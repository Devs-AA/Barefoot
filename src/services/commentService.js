import models from '../models';

/**
 * @description srvice class for comments
 */
export default class Comment {
  /**
   *
   * @param {*} body
   * @return {obj} created comment object
   */
  static async addComment(body) {
    const createdComment = await models.comments.create(body);
    return createdComment.dataValues;
  }
}
