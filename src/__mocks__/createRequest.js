export const token = {
  requester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjFAZ21haWwuY29tIiwiaWF0IjoxNTY4MzMxNTQyfQ.n5efuOIE5t8aK7JSZrgjZGJ6lrrSfETwPZ_GnrQffBA',
  requester1: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjFAZ21haWwuY29tIiwiaWF0IjoxNTY4MzQyODcyfQ.wiRocCxN9GS4s_X_30WkIth3pWawZbFM5Wafa_Q53b0',
  requester2: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwicm9sZUlkIjo1LCJlbWFpbCI6InJlcXVlc3RlcjJAZ21haWwuY29tIiwiaWF0IjoxNTY4MzQyOTM2fQ.jW00RRbqCPqMza2KxMmYM6UdQW1Ieeyp-IWNnbccRDE',
  nonRequester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwicm9sZUlkIjoyLCJlbWFpbCI6ImFiYzEyM0BnbWFpbC5jb20iLCJpYXQiOjE1NjgzMzIxNzB9.Id4DGJnFef9huOnOw_zYsyYVOLWzLwBmqIU9cQtJjho'
};

export const requests = {
  noReason: {
    departmentId: 2,
    tripType: 'oneWay'
  },
  invalidReason: {
    reason: '23231',
    departmentId: 2,
    tripType: 'oneWay'
  },
  // noTrips: {
  //   reason: 'Business',
  //   departmentId: 2,
  //   tripType: 'oneWay'
  // },
  noTripType: {
    reason: 'Business',
    departmentId: 2,
    tripType: '',
  },
  invalidTripType: {
    reason: 'Business',
    departmentId: 2,
    tripType: 'one',
  },
  noDepartment: {
    reason: 'Business',
    departmentId: null,
    tripType: 'oneWay'
  },
  invalidDepartment: {
    reason: 'Business',
    departmentId: 'p',
    tripType: 'oneWay'
  },
  valid: {
    reason: 'Business',
    departmentId: 1,
    tripType: 'oneWay'
  },
};

export const trips = {
  noDestination: {
    trip:
      {
        destinationLocationId: null, departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },
  },
  invalidDestination: {
    trip:
      {
        destinationLocationId: 'p', departureLocationId: 1, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },

  },
  nonExistentDestination: {
    trip:
      {
        destinationLocationId: 100, departureLocationId: 1, accommodationId: 100, departureDate: '2019/10/10 18:00'
      },
    tripType: 'oneWay',
  },
  noDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: null, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },

  },
  invalidDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 'k', accommodationId: 1, departureDate: '2019/10/10 18:00'
      },

  },
  nonExistentDeparture: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 100, accommodationId: 1, departureDate: '2019/10/10 18:00'
      },

  },
  noAccommodation: {
    trip: {
      destinationLocationId: 1, departureLocationId: 1, accommodationId: null, departureDate: '2019/10/10 18:00'
    },

  },
  invalidAccommodation: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 'k', departureDate: '2019/10/10 18:00'
      },

  },
  noExistentAccommodation: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 200, departureDate: '2019/10/10 18:00'
      },

  },
  noDate: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 1, departureDate: ''
      },

  },
  invalidDate: {
    trip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 1, departureDate: 'dd32dce'
      },

  },
  oneWay: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },

  },
  invalidOneWay: {
    trip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2020/10/10 18:00'
      },

  },
  return: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
    returnTrip: {
      destinationLocationId: 1, departureLocationId: 2, departureDate: '2020/10/11 18:00'
    },

  },
  invalidReturn: {
    initialTrip:
      {
        destinationLocationId: 1, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
    returnTrip: {
      destinationLocationId: 2, departureLocationId: 1, accommodationId: 3, departureDate: '2020/10/11 18:00'
    },

  },
  invalidReturn2: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
    returnTrip: {
      destinationLocationId: 3, departureLocationId: 1, accommodationId: 3, departureDate: '2020/10/11 18:00'
    },

  },
  invalidReturn3: {
    initialTrip:
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 1, departureDate: '2020/10/10 18:00'
      },

  },
  invalidReturn4: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      },
      {
        destinationLocationId: 4, departureLocationId: 4, accommodationId: 4, departureDate: '2020/10/12 18:00'
      }
    ],

  },
  multiCity: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      }
    ],
  },
  invalidOneWay2: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/11 18:00'
      }
    ],

  },
  invalidRequest: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2018/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/10 18:00'
      }
    ],
  },
  invalidRequest2: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      },
      {
        destinationLocationId: 3, departureLocationId: 2, accommodationId: 3, departureDate: '2020/10/10 18:00'
      }
    ],
  },
  invalidRequest3: {
    trips: {},
  },
  invalidRequest4: {
    trips: [2, 4],
  },
  invalidMultiCity: {
    trips: [
      {
        destinationLocationId: 2, departureLocationId: 1, accommodationId: 2, departureDate: '2020/10/10 18:00'
      }
    ],
    departmentId: 2,
    tripType: 'multiCity',
  },
};

export const users = [
  {
    firstName: 'Mike',
    lastName: 'Dean',
    email: 'barefoot1@gmail.com',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'James',
    lastName: 'Ross',
    email: 'barefoot2@gmail.com',
    roleId: 4,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jamie',
    lastName: 'Stones',
    email: 'requester1@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Ross',
    lastName: 'Mike',
    email: 'requester2@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Harvey',
    lastName: 'Specter',
    email: 'requester3@gmail.com',
    roleId: 5,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'abc123@gmail.com',
    roleId: 2,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const accommodations = [
  {
    name: 'Spring Hotels',
    noOfRooms: 2,
    type: 'standard',
    timesVisited: 1,
    destinationId: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Grace Hotels',
    noOfRooms: 1,
    type: 'standard',
    destinationId: 2,
    timesVisited: 1,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Michai Hotels',
    noOfRooms: 4,
    type: 'suite',
    timesVisited: 1,
    destinationId: 3,
    createdAt: new Date(),
    updatedAt: new Date()
  },
];

export const destinations = [
  {
    name: 'Epic Tower',
    country: 'Nigeria',
    city: 'Lagos',
    destinationId: 1,
    address: '77 Ikorodu road, Lagos, Nigeria',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Might Tower',
    country: 'Uganda',
    city: 'unknown',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Peak Tower',
    country: 'Kenya',
    city: 'Kampala',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Mount Will',
    country: 'Tanzania',
    city: 'unknown',
    address: 'unknown',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const departments = [{
  name: 'IT',
  managerId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'ACCOUNTS',
  managerId: 2,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'ADMINISTARTION',
  managerId: 3,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'HUMAN RESOURCES',
  managerId: 4,
  createdAt: new Date(),
  updatedAt: new Date()
}];
