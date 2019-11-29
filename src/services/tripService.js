import { trips, Sequelize } from '../models';

const { Op } = Sequelize;
/**
 * @description A class for Trip Service
 */
class Trips {
  /**
     *
     * @param {*} startDate The lower limit of the search
     * @param {*} endDate The upper limit of the search
     * @param {*} requesterId The id of the user whose stats is to be retrieved
     * @returns {*} returns an array of trips
     */
  static async getTripStats(startDate, endDate, requesterId) {
    const allTrips = await trips.findAll({
      where: {
        requesterId,
        departureDate: {
          [Op.between]: [startDate, endDate]
        }
      },
    });
    return allTrips;
  }
}

export default Trips;
