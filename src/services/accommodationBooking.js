import { bookings, accomodations } from '../models';

/**
 * @description A Class with static methods for Booking accommodation
 */
class Booking {
  /**
  *
  * @param {obj} bookingObj an object conataining the booking details
  * @param {obj} accommodation to be booked
  * @returns {obj} returns new booking object
  */
  static async create(bookingObj, accommodation) {
    const { noOfTimesVisited } = accommodation;
    try {
      const newBooking = await bookings.create(bookingObj);
      await accomodations.update({
        noOfTimesVisited: noOfTimesVisited + 1
      }, {
        where: {
          id: accommodation.id
        }
      });
      return newBooking.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default Booking;
