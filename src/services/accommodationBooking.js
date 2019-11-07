import { bookings } from '../models';

/**
 * @description A Class with static methods for Booking accommodation
 */
class Booking {
  /**
  *
  * @param {obj} bookingObj an object conataining the booking details
  * @returns {obj} returns new booking object
  */
  static async create(bookingObj) {
    try {
      const newBooking = await bookings.create(bookingObj);
      return newBooking.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Booking;
