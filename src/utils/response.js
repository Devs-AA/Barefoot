/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable require-jsdoc */
export default class Response {
  constructor() {
    this.statusCode = null;
    this.type = null;
    this.data = null;
    this.message = null;
  }

  setSuccess(statusCode, message, data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.type = 'success';
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = 'error';
  }

  static errorResponse(res, statusCode, err) {
    return res.status(statusCode).json({
      status: 'error',
      error: err
    });
  }

  static successResponse(res, statusCode, msg) {
    return res.status(statusCode).json({
      status: 'success',
      message: msg
    });
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.type === 'success') {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}
