import { ISession } from './useGetActiveSessions'

/* tslint:disable */
const mockHistory: ISession[] = [
  {
    sessionId: '123',
    device: {
      os: 'ios',
      osVersion: '10.0.0',
      location: {
        type: 'Point',
        coordinates: [10, 20.1],
      },
    },
    driver: {
      id: 'abcd',
      firstName: 'John',
      lastName: 'Doe',
    },
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
    timestamp: new Date('2019-09-13T08:36:12'),
  },
  {
    sessionId: '123',
    device: {
      os: 'ios',
      osVersion: '10.0.0',
      location: {
        type: 'Point',
        coordinates: [12, 21.1],
      },
    },
    driver: {
      id: 'abcd',
      firstName: 'John',
      lastName: 'Doe',
    },
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
    timestamp: new Date('2019-09-13T08:35:12'),
  },
  {
    sessionId: '123',
    device: {
      os: 'ios',
      osVersion: '10.0.0',
      location: {
        type: 'Point',
        coordinates: [13, 18.6],
      },
    },
    driver: {
      id: 'abcd',
      firstName: 'John',
      lastName: 'Doe',
    },
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
    timestamp: new Date('2019-09-13T08:34:12'),
  },
]
/* tslint:enable */

export default function useGetHistoryBySession(sessionId: string) {
  return {
    history: mockHistory,
    loading: false,
  }
}
