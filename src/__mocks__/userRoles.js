export const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsInVzZXJuYW1lIjpudWxsLCJlbWFpbCI6ImJhcmVmb290MUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJBcnZpZCIsImxhc3ROYW1lIjoiTGVkbmVyIiwibGFzdExvZ2luIjoiMjAxOS0wOS0yM1QxMzoxMzoyOC4xMjBaIiwicm9sZUlkIjo0LCJpYXQiOjE1NjkyNDc5ODF9.THuk_9GTmtUJm-KBh449D3iV126Acvj5WI4ZOejqwEY';
export const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiYmFyZWZvb3RAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiRWxvaXNlIiwibGFzdE5hbWUiOiJHb29kd2luIiwibGFzdExvZ2luIjoiMjAxOS0wOS0yM1QxMzoxMzoyOC4xMjBaIiwicm9sZUlkIjoxLCJpYXQiOjE1NjkyNDc3MTh9.GZa0urX1A1swfYoWF4id2b34-sxgVGBFsAsLrGbLHkg';
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
