import models from '../models';

/**
 *@description Trip request class
 */
export default class Request {
  /**
   *
   * @param {obj} body of the request to be created
   * @description Updates the status of a request for approval or rejection
   * @returns {obj} returns an upated request
   * @type {obj} object
   */
  static async create(body) {
    const newRequest = await models.requests.create(body);
    return newRequest.dataValues;
  }

  /**
   *
   * @param {id} id of the request
   * @param {status} status to be updated to
   * @description Updates the status of a request for approval or rejection
   * @returns {obj} returns an upated request
   * @type {obj} object
   */
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

  /**
   *
   * @param {id} id of the request to be updated
   * @param {body} body containing the parameters to update
   * @description edits a request with an open status
   * @type {obj} object
   * @returns {obj} return updated request object
   * @memberof Request class
   */
  static async editRequest(id, body) {
    const requestEdited = await models.requests.update(body, {
      returning: true,
      plain: true,
      where: {
        id
      }
    });
    return requestEdited[1].dataValues;
  }

  /**
   *
   * @param {id} id of the request to be updated
   * @description edits a request with an open status
   * @type {obj} object
   * @returns {obj} return updated request object
   * @memberof Request class
   */
  static async getAllRequest(id) {
    const foundRequests = await models.requests.findAll({
      returning: true,
      plain: true,
      where: {
        requesterId: id
      },
      include: [
        {
          model: models.trips,
          include: [models.accommodations]
        },
        {
          model: models.comments
        }
      ]
    });
    return foundRequests ? foundRequests.dataValues : [];
  }

  /**
  *
  * @param {id} id of the request to be retrieved
  * @description gets a specific request
  * @type {obj} object
  * @returns {obj} return updated request object
  * @memberof Request class
  */
  static async getOneRequest(id) {
    try {
      const foundRequests = await models.requests.findOne({
        returning: true,
        plain: true,
        where: {
          id
        },
        include: [
          {
            model: models.trips,
            include: [models.accommodations]
          },
          {
            model: models.comments
          }
        ]
      });
      return foundRequests ? foundRequests.dataValues : false;
    } catch (error) {
      throw new Error(error);
    }
  }
}
