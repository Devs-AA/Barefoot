import models from '../models';
import Response from '../utils/response';
import Request from '../services/requestService';
import Notification from '../services/notificationService';
import { io } from '../index';


export const response = new Response();
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

      const newNotification = {
        title: 'New Travel Request',
        recipientId: managerId,
        requestId: newRequest.id
      };
      await Notification.createEmailNotification(requesterId, managerId, newNotification);

      response.setSuccess(201, 'Request Created Successfully', newRequest);
      response.send(res);
      return io.emit(`notify-${managerId}`, `${req.user.firstName} created a travel request`);
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
    let message;
    const { user } = req;
    const approvedRequestMessage = `Congrats ${user.firstName}, your Manager has approved your Travel request`;
    const rejectedRequestMessage = `Sorry ${user.firstName}, your Manager has rejected your Travel request`;
    const { status } = req.body;
    const id = parseInt(req.params.requestId, 10);
    try {
      const updatedRequest = await Request.updateStatus(id, status);
      response.setSuccess(200, `Request ${updatedRequest.status} Successfully`, updatedRequest);
      response.send(res);
      const { requesterId, managerId } = updatedRequest;
      const notification = {
        title: `Travel Request ${updatedRequest.status}`,
        recipientId: requesterId,
        requestId: id
      };
      message = status === 'approved' ? approvedRequestMessage : rejectedRequestMessage;
      await Notification.createEmailNotification(requesterId, managerId, notification, message);
      return io.emit(`notify-${requesterId}`);
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
  static async editRequest(req, res, next) {
    const id = parseInt(req.params.requestId, 10);
    try {
      const updatedRequest = await Request.editRequest(id, { ...req.body });
      response.setSuccess(200, 'Request Updated Successfully', updatedRequest);
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
  static async findOne(req, res, next) {
    const { requestId } = req.params;
    try {
      const request = await Request.getOneRequest(requestId);
      response.setSuccess(200, 'Request Retrieved Successfully', request);
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
  static async findAll(req, res, next) {
    const { id } = req.user;
    try {
      const requests = await Request.getAllRequest(id);
      response.setSuccess(200, 'Request Retrieved Successfully', requests);
      return response.send(res);
    } catch (error) {
      error.status = 500;
      next(error);
    }
  }
}
