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
    console.log(updatedRequest);
    return updatedRequest[1].dataValues;
  }
}
