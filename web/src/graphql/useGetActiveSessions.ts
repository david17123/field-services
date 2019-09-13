interface IGeojsonPoint {
  type: 'Point'
  coordinates: number[]
}

interface IDevice {
  os: string
  osVersion: string
  location: IGeojsonPoint
}

interface IDriver {
  id: string
  firstName: string
  lastName: string
}

interface IVehicle {
  regNumber: string
  vehicleType: string
}

export interface ISession {
  sessionId: string
  device: IDevice
  driver: IDriver
  vehicle: IVehicle
  timestamp: Date
}

/* tslint:disable */
const mockData: ISession[] = [
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
    sessionId: '456',
    device: {
      os: 'android',
      osVersion: '8.4.0',
      location: {
        type: 'Point',
        coordinates: [12, 29.4],
      },
    },
    driver: {
      id: 'efgh',
      firstName: 'Beth',
      lastName: 'Simon',
    },
    vehicle: {
      regNumber: 'def456',
      vehicleType: 'truck',
    },
    timestamp: new Date('2019-09-13T08:36:20'),
  },
  {
    sessionId: '789',
    device: {
      os: 'ios',
      osVersion: '11.3.0',
      location: {
        type: 'Point',
        coordinates: [8, 40.3],
      },
    },
    driver: {
      id: 'ijkl',
      firstName: 'Rose',
      lastName: 'McCarthy',
    },
    vehicle: {
      regNumber: 'ghi789',
      vehicleType: 'ute',
    },
    timestamp: new Date('2019-09-13T08:36:47'),
  },
]
/* tslint:enable */

export default function useGetActiveSessions() {
  return {
    activeSessions: mockData,
    loading: false,
  }
}
