import {
  accommodations, ratings, Sequelize, likes, unlikes
} from '../models';


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

  /**
   *
   * @param {obj} obj object containing rating details
   * @returns {obj} returns new rating object
   */
  static async rate(obj) {
    try {
      const newRating = await ratings.create(obj);
      const { accommodationId } = newRating;
      const rating = await Accommodation.getAverageRating(accommodationId);
      await accommodations.update({ rating }, {
        returning: true,
        plain: true,
        where: {
          id: accommodationId
        }
      });
      return newRating.dataValues;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {*} accommodationId id of the accommodation to get rating
   * @returns {float} returns the average rating  for the accommodation with the given id
   */
  static async getAverageRating(accommodationId) {
    const [{ dataValues }, ] = await ratings.findAll({
      where: {
        accommodationId
      },
      attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'avgRating']],
    });
    return Math.round(dataValues.avgRating * 10) / 10;
  }

  /**
   *
   * @param {*} noOfLikes the current number of likes an accommodation has
   * @param {*} likeObj the object containing the parameters for a like
   * @returns {obj} returns the created like object
   */
  static async like(noOfLikes, likeObj) {
    const { dataValues } = await likes.create(likeObj);
    const { accommodationId } = dataValues;
    await accommodations.update({ likes: noOfLikes + 1 }, {
      where: {
        id: accommodationId
      }
    });
    return dataValues;
  }

  /**
   *
   * @param {*} noOfUnlikes the current number of likes an accommodation has
   * @param {*} unLikeObj the object containing the parameters for a like
   * @returns {obj} returns the created like object
   */
  static async unlike(noOfUnlikes, unLikeObj) {
    const { dataValues } = await unlikes.create(unLikeObj);
    const { accommodationId } = dataValues;
    await accommodations.update({ unlikes: noOfUnlikes + 1 }, {
      where: {
        id: accommodationId
      }
    });
    return dataValues;
  }
}


export default Accommodation;
