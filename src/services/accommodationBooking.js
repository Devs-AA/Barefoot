import { bookings, accommodations, requests } from '../models';

/**
 * @description A Class with static methods for Booking accommodation
 */
class Booking {
  /**
  *
  * @param {obj} bookingObj an object conataining the booking details
  * @param {obj} accommodation to be booked
  * @param {int} requestId the id trip request being booked
  * @returns {obj} returns new booking object
  */
  static async create(bookingObj, accommodation, requestId) {
    const { noOfTimesVisited } = accommodation;
    try {
      const newBooking = await bookings.create(bookingObj);
      await accommodations.update({
        noOfTimesVisited: noOfTimesVisited + 1
      }, {
        where: {
          id: accommodation.id
        }
      });
      await requests.update({
        active: false,
      }, {
        where: {
          id: requestId
        }
      });
      return newBooking.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Booking;
