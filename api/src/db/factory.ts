// TODO There should be a way to programmatically create mock entries for test
// database, rather than manual entry like this.

// List of registered drivers who can interact with the system
export const drivers = [
  {
    _id: '1234', // TODO Better use UUID string
    firstName: 'John',
    lastLogin: new Date(),
    lastName: 'Doe',
    mobileNumber: '0412345678',
    password: 'logmein',
    profilePicture: '',
    username: 'john@example.com',
  },
  {
    _id: '8529', // TODO Better use UUID string
    firstName: 'Beth',
    lastLogin: new Date(),
    lastName: 'McCarthy',
    mobileNumber: '0485296341',
    password: 'logmein2',
    profilePicture: '',
    username: 'beth@example.com',
  },
]

// A session is essentially started when a driver logs in to the system, thus
// creating a tuple of driver and device info.
export const activeSessions = [
  {
    device: {
      location: {
        coordinates: [10, 20.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driverId: '8529',
    sessionId: '5678', // TODO Better use UUID string
    timestamp: new Date(),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
]

// This collection is an append log for all sessions. Whenever a session is
// is updated (e.g. location update), a new entry will be added to this
// collection.
export const sessionHistories = [
  {
    device: {
      location: {
        coordinates: [10, 20.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driverId: '8529',
    sessionId: '5678',
    timestamp: new Date(),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
]

// This collection is an append log of all user actions with the system, which
// are either one of login, logout or set_vehicle
export const activityLogs = [
  {
    activityType: 'login',
    driverId: '8529',
    success: true,
    timestamp: new Date(),
  },
  {
    activityType: 'set_vehicle',
    driverId: '8529',
    success: true,
    timestamp: new Date(),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
]
