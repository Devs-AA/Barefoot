const body = {
  valid: {
    reason: 'Business',
    tripType: 'oneWay',
    departmentId: 3
  },
  noReason: {
    reason: '',
    tripType: 'oneWay',
    departmentId: 3
  },
  sameReason: {
    reason: 'Business',
    tripType: 'return',
  },
  sameTripType: {
    reason: 'Meeting',
    tripType: 'oneWay',
  }

};

export default body;
