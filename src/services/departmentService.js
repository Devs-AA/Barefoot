/* eslint-disable no-useless-catch */
import db from '../models/index';

const { departments } = db;
/**
 * @param { class } provide response to user signup activity.
 */
class departmentService {
  /**
   * @param { id } id to check in database.
 * @returns {object} containing found details from department.
 */
  static async checkIfDepartmentIdExist(id) {
    try {
      const department = await departments.findOne({
        where: { id }
      });
      return department;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { id } id to check in database.
   * @param { managerId } managerId to check in database.
 * @returns {object} containing found details from department.
 */
  static async checkIfDepartmentManagerExist(id, managerId) {
    try {
      const department = await departments.findOne({
        where: { id, managerId }
      });
      return department;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param { id } id to check in database.
   * @param { name } name to check in database.
 * @returns {object} containing found details from department.
 */
  static async checkIfDepartmentNameExist(id, name) {
    try {
      const department = await departments.findOne({
        where: { id, name }
      });
      return department;
    } catch (error) {
      throw error;
    }
  }
}

export default departmentService;
