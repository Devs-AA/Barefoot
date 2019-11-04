import Comment from '../services/commentService';

/**
 * @description Request Controller Class
 * */
export default class CommentController {
  /**
     *
     * @param {*} req
     * @param {*} res
     * @param {*} next
     * @returns {obj} returns created comment object
     */
  static async create(req, res, next) {
    const commentObj = {
      message: req.body.message.trim(),
      requestId: req.params.requestId,
      ownerId: req.user.id
    };
    if (req.body.quotedCommentId) {
      commentObj.quotedCommentId = req.body.quotedCommentId;
    }
    try {
      const createdComment = await Comment.addComment(commentObj);
      return res.status(201).json({
        success: true,
        data: createdComment
      });
    } catch (error) {
      next(error);
    }
  }

  /**
    *
    * @param {*} req
    * @param {*} res
    * @param {*} next
    * @returns {obj} returns created comment object
    */
  static async delete(req, res, next) {
    const { commentId } = req.params;
    try {
      await Comment.deleteComment(commentId);
      return res.status(200).json({
        success: true,
        data: 'Comment deleted Successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}
