export const unauthorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNSwiZW1haWwiOiJhbmllZmlvZGthQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkRvZyIsImxhc3ROYW1lIjoiaGdoZ2giLCJyb2xlSWQiOjUsImlzVmVyaWZpZWQiOmZhbHNlLCJ1c2VybmFtZSI6bnVsbH0sImlhdCI6MTU2OTA5NTY4OH0.AwkM77ix7nkrCo65N5UUdDeDncwWpMrJjKl-ADUmr60';
export const authorizedToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiYW5pZWZpb2thQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6Ik1vcmdhbiIsImxhc3ROYW1lIjoiSGVybWFubiIsImxhc3RMb2dpbiI6IjIwMTktMDktMjFUMTY6NDU6MTMuODcxWiIsImlzVmVyaWZpZWQiOm51bGwsInJvbGVJZCI6MX0sImlhdCI6MTU2OTA5ODAxNX0.amVNU-rjGfp_gTV_W3xqD4IVDwhFA9sqEu2HDg76rMQ';
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
