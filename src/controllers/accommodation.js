import accommodationService from '../services/accommodation';
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
    const { body } = req;
    try {
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
}

export default Accommodation;
