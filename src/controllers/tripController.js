import Response from '../utils/response';
import Service from '../services/tripService';


export const response = new Response();


/**
 * @description A class for Trips
 */
class Trips {
  /**
*
* @param {*} req request object
* @param {*} res response object
* @param {*} next next method
* @returns {object} returns response object
*/
  static async getTripStats(req, res, next) {
    const { startDate, endDate } = req.body;
    let { id } = req.user;
    const { userId } = req;
    if (userId) {
      id = userId;
    }
    try {
      const stats = await Service.getTripStats(startDate, endDate, id);
      response.setSuccess(200, `${stats.length} trips between ${startDate} - ${endDate}`, stats);
      return response.send(res);
    } catch (error) {
      return next(error);
    }
  }
}

export default Trips;
