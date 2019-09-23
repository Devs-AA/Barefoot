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
    this.success = true;
  }

  setError(statusCode, message) {
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
  }

  static errorResponse(res, statusCode, err) {
    return res.status(statusCode).json({
      success: false,
      error: err
    });
  }

  static successResponse(res, statusCode, msg) {
    return res.status(statusCode).json({
      success: true,
      message: msg
    });
  }

  send(res) {
    const result = {
      status: this.type,
      message: this.message,
      data: this.data,
    };

    if (this.success === true) {
      return res.status(this.statusCode).json(result);
    }
    return res.status(this.statusCode).json({
      status: this.type,
      message: this.message,
    });
  }
}
