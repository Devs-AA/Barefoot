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

  /**
   *
   * @param {*} id of the comment to be deleted
   * @return {obj} created comment object
   */
  static async deleteComment(id) {
    const comment = await models.comments.destroy({
      where: {
        id
      }
    });
    return comment;
  }
}
