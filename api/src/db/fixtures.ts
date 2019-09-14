import { ObjectID } from 'mongodb'
import uuid4 from 'uuid/v4'

import { IActivityLog, IDriver, ISession } from './modelTypes'

// TODO There should be a way to programmatically create mock entries for test
// database, rather than manual entry like this.

// List of registered drivers who can interact with the system
export const drivers: IDriver[] = [
  {
    _id: new ObjectID(),
    firstName: 'John',
    lastLogin: new Date(),
    lastName: 'Doe',
    mobileNumber: '0412345678',
    password: 'logmein',
    profilePicture: '',
    username: 'john@example.com',
  },
  {
    _id: new ObjectID(),
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
export const activeSessions: ISession[] = [
  {
    _id: new ObjectID(),
    device: {
      location: {
        coordinates: [10, 20.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driverId: drivers[1]._id,
    sessionId: uuid4(),
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
export const sessionHistories: ISession[] = [
  {
    _id: new ObjectID(),
    device: {
      location: {
        coordinates: [10, 20.1],
        type: 'Point',
      },
      os: 'ios',
      osVersion: '10.0.0',
    },
    driverId: drivers[1]._id,
    sessionId: activeSessions[0].sessionId,
    timestamp: new Date(),
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
]

// This collection is an append log of all user actions with the system, which
// are either one of login, logout or set_vehicle
export const activityLogs: IActivityLog[] = [
  {
    _id: new ObjectID(),
    driverId: drivers[1]._id,
    success: true,
    timestamp: new Date(),
    type: 'login',
  },
  {
    _id: new ObjectID(),
    driverId: drivers[1]._id,
    success: true,
    timestamp: new Date(),
    type: 'setVehicle',
    vehicle: {
      regNumber: 'abc123',
      vehicleType: 'van',
    },
  },
]
