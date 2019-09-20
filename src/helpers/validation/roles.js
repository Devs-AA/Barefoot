const setRoleValidator = (body, err) => {
  const { email, roleId } = body;
  const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
  if (!emailRegex.test(email)) {
    err.email = err.email || 'Invalid Email';
  }
  if (!Number(roleId) && !err.roleId) {
    err.roleId = 'Invalid role id';
  }
  return err;
};
export default setRoleValidator;
