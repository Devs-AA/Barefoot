export const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZUlkIjozLCJlbWFpbCI6ImFiYzEyM0BnbWFpbC5jb20iLCJpYXQiOjE1Njc2OTYzMjF9.znc0vuh4UAhsKFmkaCl_oE0DlVwW855487kzMKMJ_OA';
export const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZUlkIjoxLCJlbWFpbCI6ImJhcmVmb290QGdtYWlsLmNvbSIsImlhdCI6MTU2NzY5NjI3OX0.2B1B6RtIZKO_Axz8vvp6TsKWnWkqCVBlgqcFkTpr_hs';
export const validInfoRole = {
  roleId: 4,
  email: 'abc123@gmail.com'
};
export const unauthorisedRoleUser = {
  roleId: 1,
  email: 'abc123@gmail.com'
};
export const invalidInfoRole1 = {
  roleId: 2,
  email: ''
};
export const invalidInfoRole2 = {
  roleId: null,
  email: 'abc123@gmail.com'
};
export const invalidInfoRole3 = {
  roleId: 2,
  email: 'samsung123@gmail.com'
};

export const users = {
  superAdmin: {
    firstName: 'John',
    lastName: 'Doe',
    roleId: 1,
    password: 'password',
    email: 'barefoot@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  nonadmin: {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'abc123@gmail.com',
    password: 'password',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};


export const roles = {
  superAdmin: {
    name: 'Super Administrator',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  travelAdmin: {
    name: 'Travel Administrator',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  travelTeamMember: {
    name: 'Treavel Team Member',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  manager: {
    name: 'Manager',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  requester: {
    name: 'Requester',
    createdAt: new Date(),
    updatedAt: new Date()
  },
};
