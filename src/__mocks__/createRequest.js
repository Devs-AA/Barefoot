export const token = {
  requester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxNywidXNlcm5hbWUiOm51bGwsImVtYWlsIjoicmVxdWVzdGVyMUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKb3NlZmluYSIsImxhc3ROYW1lIjoiRW1hcmQiLCJsYXN0TG9naW4iOiIyMDE5LTA5LTI2VDE3OjM5OjA5LjE1NFoiLCJpc1ZlcmlmaWVkIjpudWxsLCJyb2xlSWQiOjV9LCJpYXQiOjE1Njk1MjUyODd9.4TF2w1JIggIr9wWQTHaJvF-cLjC9JNY9sng7YSHIFd0',
  requester1: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOCwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoicmVxdWVzdGVyMkBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJHZW9yZ2UiLCJsYXN0TmFtZSI6Ik1jTGF1Z2hsaW4iLCJsYXN0TG9naW4iOiIyMDE5LTA5LTI2VDE3OjM5OjA5LjE1NFoiLCJpc1ZlcmlmaWVkIjpudWxsLCJyb2xlSWQiOjV9LCJpYXQiOjE1Njk1MjUyMTF9.9ykmebR-hWxBxQKUF93JD7SJ0ROAZSkJh5qOdGnb7wY',
  requester2: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxOSwidXNlcm5hbWUiOm51bGwsImVtYWlsIjoicmVxdWVzdGVyM0BnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJKYWVkZW4iLCJsYXN0TmFtZSI6IkdyYW50IiwibGFzdExvZ2luIjoiMjAxOS0wOS0yNlQxNzozOTowOS4xNTRaIiwiaXNWZXJpZmllZCI6bnVsbCwicm9sZUlkIjo1fSwiaWF0IjoxNTY5NTI1MzE5fQ.NYm7aKjbZxTVooJeIoqd6botVPskqkcl2FWZ3fwpX9c',
  nonRequester: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMywidXNlcm5hbWUiOm51bGwsImVtYWlsIjoiYWJjMTIzQGdtYWlsLmNvbSIsImZpcnN0TmFtZSI6IkFsaXZpYSIsImxhc3ROYW1lIjoiWW9zdCIsImxhc3RMb2dpbiI6IjIwMTktMDktMjZUMTc6Mzk6MDkuMTU0WiIsImlzVmVyaWZpZWQiOm51bGwsInJvbGVJZCI6NH0sImlhdCI6MTU2OTUyNTM0OX0.5F7oKpwUwK5h0_Ueg8FY6ETsMulFPLz6kUhnB78th04'
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
      }
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
}];

export const login = [
  {
    email: 'barefoot1@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'barefoot2@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'barefoot3@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'abc123@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'requester1@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'requester2@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    email: 'barefoot@gmail.com',
    password: '$2b$10$zo1cmvfnj.lSwdkGACaAMefFg2J7YuMhu9Tg.9.RXJaKzqUEKeG7a',
    lastLogin: new Date(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
];
