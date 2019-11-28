import accommodationService from '../services/accommodation';
import Booking from '../services/accommodationBooking';
import Response from '../utils/response';

const response = new Response();

/**
 * @description Accommodation controller class
 */
class Accommodation {
  /**
   *
   * @param {*} req object
   * @param {*} res object
   * @param {*} next method
   * @returns {obj} response object
   */
  static async create(req, res, next) {
    const { body, images } = req;
    try {
      if (images) {
        body.images = images;
      }
      const acc = await accommodationService.create(body);
      if (!acc) {
        throw new Error('Something went wrong');
      }
      response.setSuccess(201, 'Accommodation created successfully', acc);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  }

  /**
   *
   * @param {*} req object
   * @param {*} res object
   * @param {*} next method
   * @returns {obj} response object
   */
  static async book(req, res, next) {
    const { body, accommodation } = req;
    const { accommodationId } = req.params;
    const { id } = req.request;
    body.requesterId = req.user.id;
    body.accommodationId = accommodationId;
    try {
      const newBooking = await Booking.create(body, accommodation, id);
      response.setSuccess(201, 'Accommodation booked successfully', newBooking);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  }

  /**
 *
 * @param {*} req object
 * @param {*} res object
 * @param {*} next method
 * @returns {obj} response object
 */
  static async rate(req, res, next) {
    const { body } = req;
    const { firstName, id } = req.user;
    const { accommodationId } = req.params;
    body.requesterName = firstName;
    body.requesterId = id;
    body.accommodationId = accommodationId;
    try {
      const rating = await accommodationService.rate(body);
      response.setSuccess(201, 'Feedback Registered', rating);
      return response.send(res);
    } catch (error) {
      next(error);
    }
  }
}

export default Accommodation;
