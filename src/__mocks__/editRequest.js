const body = {
  valid: {
    reason: 'Business',
    tripType: 'oneWay',
  },
  noReason: {
    reason: 9,
    tripType: 'oneWay',
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
