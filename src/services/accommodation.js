import { accommodations } from '../models';

/**
 * @description Class for accommodation service
 */
class Accommodation {
  /**
   *
   * @param {*} body containing all properties of an accommodation
   * @returns {obj} returns the newly crrated accommodation object
   */
  static async create(body) {
    const newAccommodation = await accommodations.create(body);
    return newAccommodation ? newAccommodation.dataValues : false;
  }
}

export default Accommodation;
