export const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOSwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoicmVxdWVzdGVyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKYWVkZW4iLCJsYXN0TmFtZSI6IkdyYW50IiwibGFzdExvZ2luIjoiMjAxOS0wOS0yNlQxNzozOTowOS4xNTRaIiwiaXNWZXJpZmllZCI6bnVsbCwicm9sZUlkIjo1fSwiaWF0IjoxNTY5NTI1MzE5fQ.NYm7aKjbZxTVooJeIoqd6botVPskqkcl2FWZ3fwpX9c';
export const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo2LCJ1c2VybmFtZSI6ImlhbW1hcnVzb2Z0NCIsImVtYWlsIjoiYW5pZWZpb2thQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6ImFsaW1pNCIsImxhc3ROYW1lIjoibWFydXNvZnQ0IiwibGFzdExvZ2luIjoiMjAxOS0wOS0yNlQxOTozMzoxNC4yNDlaIiwiaXNWZXJpZmllZCI6dHJ1ZSwicm9sZUlkIjoxfSwiaWF0IjoxNTY5NTI2NDEyfQ.CHEyi1PW8M8yS_i9qWKlGcixcodb41qZ9CsPC2JNJ88';
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
    email: 'aniefioka@gmail.com',
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
