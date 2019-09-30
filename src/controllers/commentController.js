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
}
