import setRoleValidator from '../helpers/validation/roles';
import models from '../models';
import { checkIfExistsInDb, findByEmail } from '../utils/searchDb';

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
    // Find resource by name in the db if it exists
    if (roles.length > 0 && !roles.includes(roleId)) {
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
