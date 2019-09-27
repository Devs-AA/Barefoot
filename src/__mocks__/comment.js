export default {
  valid: {
    message: 'Test message for comments',
    quotedCommentId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  quotedComment: {
    message: 'Quoted Comment',
    quotedCommentId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  noMessage: {
    message: '',
    quotedCommentId: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  invalidQuote: {
    message: 'Test comment',
    quotedCommentId: 'h',
    createdAt: new Date(),
    updatedAt: new Date()
  }
};
