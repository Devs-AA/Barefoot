/* eslint-disable radix */
import setRoleValidator from '../helpers/validation/roles';
import models from '../models';
import { checkIfExistsInDb, findByEmail } from '../utils/searchDb';
import departmentService from '../services/departmentService';

const {
  checkIfDepartmentIdExist, checkIfDepartmentNameExist,
  checkIfDepartmentManagerExist
} = departmentService;


export const validateSetRole = async (req, res, next) => {
  const err = {};
  const { email, roleId } = req.body;
  try {
    if (!email) {
      err.email = 'Email not provided';
    }
    if (!roleId) { err.roleId = 'Role id not provided'; }
    setRoleValidator({ email, roleId }, err);
    if (Object.keys(err).length) {
      return res.status(400).json({
        success: false,
        error: err
      });
    }
    req.body.email = req.body.email.trim();
    req.newRole = await checkIfExistsInDb(models.roles, roleId, 'Role does not exist');
    req.userToUpdate = await findByEmail(email.trim());
    next();
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: error.message
    });
  }
};

export const permit = (roles = []) => (req, res, next) => {
  const { roleId } = req.user;
  try {
    // Check if role is permitted
    if (roles.length && !roles.includes(roleId)) {
      throw new Error('You are not authorized to perform this operation');
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const checkRoleConflict = (req, res, next) => {
  const { email } = req.user;
  const { userToUpdate, body: { roleId } } = req;
  const { newRole } = req;
  if (email === req.body.email) {
    return res.status(403).json({
      success: false,
      message: 'You are not allowed to perform this operation'
    });
  }
  if (userToUpdate.dataValues.roleId === parseInt(roleId, 10)) {
    return res.status(409).json({
      success: false,
      message: `User already has the role ${newRole.name}`
    });
  }
  next();
};

export const allowedToggleValue = (req, res, next) => {
  let { saveProfile } = req.body;
  saveProfile = saveProfile ? saveProfile.trim() : 'false';
  const boolean = ['true', 'false'];
  if (saveProfile !== boolean[0] && saveProfile !== boolean[1]) {
    return res.status(403).json({
      success: false,
      message: 'saveProfile values can only be true or false'
    });
  }
  next();
};


export const checkInputFromDepartmentDb = async (req, res, next) => {
  let { department, lineManager, departmentId } = req.body;
  if (department) {
    department = department.trim().toUpperCase();
  }
  if (lineManager) {
    lineManager = parseInt(lineManager.trim());
  }
  if (departmentId) {
    departmentId = parseInt(departmentId.trim());
  }
  if (!departmentId && lineManager) {
    return res.status(403).json({
      success: false,
      message: 'lineManager cannot be set without departmentId'
    });
  }
  if (!departmentId && department) {
    return res.status(403).json({
      success: false,
      message: 'department cannot be set without departmentId'
    });
  }
  try {
    if (departmentId) {
      const userDepartmentId = await checkIfDepartmentIdExist(departmentId);
      if (!userDepartmentId) {
        return res.status(403).json({
          success: false,
          message: `The department id does not exist, 
          please contact your company department`
        });
      }
    }
    if (departmentId && lineManager) {
      const userDepartmentManager = await checkIfDepartmentManagerExist(departmentId, lineManager);
      if (!userDepartmentManager) {
        return res.status(403).json({
          success: false,
          message: `The lineManager id does not exist for that departmentId, 
          please contact your company department`
        });
      }
    }
    if (departmentId && department) {
      const userDepartmentName = await checkIfDepartmentNameExist(departmentId, department);
      if (!userDepartmentName) {
        return res.status(403).json({
          success: false,
          message: `The department name does not exist for that departmentId, 
          please contact your company department`
        });
      }
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
