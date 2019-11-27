/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-useless-escape
export const regexForEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const roleIds = {
  superAdmin: 1,
  travelAdmin: 2,
  traveTeamMember: 3,
  manager: 4,
  requester: 5
};

export const trimString = (str) => str.trim();
