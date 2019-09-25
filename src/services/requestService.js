import models from '../models';

export default class Request {
  static async updateStatus(id, status) {
    const updatedRequest = await models.requests.update({ status }, {
      returning: true,
      plain: true,
      where: {
        id
      }
    });
    return updatedRequest[1].dataValues;
  }

  static async editRequest(id, body) {
    const requestEdited = await models.requests.update(body, {
      returning: true,
      plain: true,
      where: {
        id
      }
    });
    return requestEdited[1].dataValues
  }
}
