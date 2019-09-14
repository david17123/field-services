import { ISession } from '../src/graphql/useGetActiveSessions'

/**
 * Session history mock value as returned by GraphQL end point
 */
const sessionHistories: ISession[] = [
  {
    device: {
      location: {
        coordinates: [10, 20.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driver: {
      firstName: 'John',
      id: 'abcd',
      lastName: 'Doe',
    },
    sessionId: '123',
    timestamp: new Date('2019-09-13T08:36:12'),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
  {
    device: {
      location: {
        coordinates: [12, 21.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driver: {
      firstName: 'John',
      id: 'abcd',
      lastName: 'Doe',
    },
    sessionId: '123',
    timestamp: new Date('2019-09-13T08:37:12'),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
  {
    device: {
      location: {
        coordinates: [16, 20.8],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driver: {
      firstName: 'John',
      id: 'abcd',
      lastName: 'Doe',
    },
    sessionId: '123',
    timestamp: new Date('2019-09-13T08:38:12'),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
  {
    device: {
      location: {
        coordinates: [12, 29.4],
        type: 'Point',
      },
      os: 'android',
      osVersion: '8.4.0',
    },
    driver: {
      firstName: 'Beth',
      id: 'efgh',
      lastName: 'Simon',
    },
    sessionId: '456',
    timestamp: new Date('2019-09-13T08:36:20'),
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
  },
  {
    device: {
      location: {
        coordinates: [10, 33],
        type: 'Point',
      },
      os: 'android',
      osVersion: '8.4.0',
    },
    driver: {
      firstName: 'Beth',
      id: 'efgh',
      lastName: 'Simon',
    },
    sessionId: '456',
    timestamp: new Date('2019-09-13T08:37:20'),
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
  },
  {
    device: {
      location: {
        coordinates: [11, 32.1],
        type: 'Point',
      },
      os: 'android',
      osVersion: '8.4.0',
    },
    driver: {
      firstName: 'Beth',
      id: 'efgh',
      lastName: 'Simon',
    },
    sessionId: '456',
    timestamp: new Date('2019-09-13T08:38:20'),
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
  },
  {
    device: {
      location: {
        coordinates: [14, 35.6],
        type: 'Point',
      },
      os: 'android',
      osVersion: '8.4.0',
    },
    driver: {
      firstName: 'Beth',
      id: 'efgh',
      lastName: 'Simon',
    },
    sessionId: '456',
    timestamp: new Date('2019-09-13T08:39:20'),
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
  },
  {
    device: {
      location: {
        coordinates: [8, 40.3],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '11.3.0',
    },
    driver: {
      firstName: 'Rose',
      id: 'ijkl',
      lastName: 'McCarthy',
    },
    sessionId: '789',
    timestamp: new Date('2019-09-13T08:36:47'),
    vehicle: {
      regNumber: 'ghi789',
      vehicleType: 'ute',
    },
  },
  {
    device: {
      location: {
        coordinates: [11, 38.3],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '11.3.0',
    },
    driver: {
      firstName: 'Rose',
      id: 'ijkl',
      lastName: 'McCarthy',
    },
    sessionId: '789',
    timestamp: new Date('2019-09-13T08:37:47'),
    vehicle: {
      regNumber: 'ghi789',
      vehicleType: 'ute',
    },
  },
]

export default sessionHistories
