export const getStatsUser = {
  startDate: '2019/10/11',
  endDate: '2090/10/11'
};

export const getStatsManager = {
  startDate: '2019/10/11',
  endDate: '2090/10/11',
  email: 'requester1@gmail.com'
};

export const noStartDate = {
  endDate: '2090/10/11',
};

export const invalidStartDate = {
  startDate: '2019ghjkj',
  endDate: '2090/10/11',
};

export const noEndDate = {
  startDate: '2019/10/11',
};

export const invalidEndDate = {
  startDate: '2019/10/11',
  endDate: 'jciuicu76xhqsj',
};

export const nonExistentUser = {
  startDate: '2019/10/11',
  endDate: '2090/10/11',
  email: 'requester200@gmail.com'
};

export const invalidEmail = {
  startDate: '2019/10/11',
  endDate: '2090/10/11',
  email: 'requester200.com'
};

export const wrongDepartment = {
  startDate: '2019/10/11',
  endDate: '2090/10/11',
  email: 'requester1@gmail.com'
};
