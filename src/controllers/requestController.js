import models from '../models';
import Response from '../utils/response';
import Request from '../services/requestService';

const response = new Response();
/**
 * @description A class for requests
 */
export default class Requests {
  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next method
   * @returns {object} returns response object
   */
  static async createRequest(req, res, next) {
    const {
      tripType, departmentId, reason
    } = req.body;
    const requesterId = req.user.id;
    const { managerId } = req;
    try {
      const newRequest = await models.requests.create({
        tripType,
        requesterId,
        departmentId,
        managerId,
        reason
      });
      response.setSuccess(201, 'Request Created Successfully', newRequest);
      return response.send(res);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }

  /**
*
* @param {*} req request object
* @param {*} res response object
* @param {*} next next method
* @returns {object} returns response object
*/
  static async createRequestTrip(req, res, next) {
    const {
      tripType, id
    } = req.request;
    try {
      if (tripType === 'oneWay') {
        const { trip } = req.body;
        trip.requestId = id;
        await models.trips.create(trip);
      } else if (tripType === 'return') {
        const { initialTrip, returnTrip } = req.body;
        initialTrip.requestId = id;
        returnTrip.requestId = id;
        await models.trips.create(initialTrip);
        await models.trips.create(returnTrip);
      } else {
        const { trips } = req.body;
        const createdTrips = trips.map(async (trip) => {
          trip.requestId = id;
          const createdTrip = await models.trips.create(trip);
          return createdTrip.dataValues;
        });
        await Promise.all(createdTrips);
      }
      const request = await models.requests.findOne(
        {
          include: [
            {
              model: models.trips,
              include: [models.accommodations]
            }
          ],
          where: {
            id
          },
        }
      );
      response.setSuccess(201, 'Trips Created Successfully', request);
      return response.send(res);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }

  /**
   *
   * @param {*} req request object
   * @param {*} res response object
   * @param {*} next next method
   * @returns {object} returns response object
   */
  static async updateStatus(req, res, next) {
    const { status } = req.body;
    const id = parseInt(req.params.requestId, 10);
    try {
      const updatedRequest = await Request.updateStatus(id, status);
      response.setSuccess(200, `Request ${updatedRequest.status} Successfully`, updatedRequest);
      return response.send(res);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
}
