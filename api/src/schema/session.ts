import { gql } from 'apollo-server'
import { ObjectID } from 'mongodb'

import { getDb } from '../db/connection'
import { IGeojsonPoint } from '../db/modelTypes'

// TODO There might be a way to generate these interfaces from the schema
interface IReportLocationArgs {
  sessionId: string
  point: IGeojsonPoint
}

interface IGetSessionHistoryArgs {
  driverId: string
  regNumber: string
  sessionId: string
}

export const typeDefs = gql`
  input GeojsonPointInput {
    type: String
    coordinates: [Float]
  }

  extend type Query {
    session: SessionQuery
  }

  type SessionQuery {
    getActiveSessions: [Session]
    getSessionHistory(driverId: ID, regNumber: String, sessionId: ID): [Session]
  }

  type Driver {
    id: ID
    username: String
    firstName: String
    lastName: String
    mobileNumber: String
    profilePicture: String
    "This is datetime value in ISO 8601 format"
    lastLogin: String # TODO Should create and use a new scalar Date for this
  }

  type Session {
    sessionId: ID
    device: Device
    driver: Driver
    vehicle: Vehicle
    "This is datetime value in ISO 8601 format"
    timestamp: String # TODO Should create and use a new scalar Date for this
  }

  type Device {
    os: String
    osVersion: String
    location: GeojsonPoint
  }

  type Vehicle {
    regNumber: String
    vehicleType: String
  }

  type GeojsonPoint {
    type: String
    coordinates: [Float]
  }

  extend type Mutation {
    session: SessionMutation
  }

  type SessionMutation {
    reportLocation(sessionId: ID!, point: GeojsonPointInput!): Boolean
  }
`

export const resolvers = {
  Query: {
    session: () => ({}),
  },

  SessionQuery: {
    getActiveSessions: async () => {
      const db = await getDb()
      const activeSessionCollection = db.collection('activeSession')
      return activeSessionCollection.find().toArray()
    },
    getSessionHistory: async (root: any, args: IGetSessionHistoryArgs) => {
      const db = await getDb()
      const sessionHistoryCollection = db.collection('sessionHistory')
      if (args.driverId) {
        return sessionHistoryCollection.find({ driverId: new ObjectID(args.driverId) }).toArray()
      } else if (args.regNumber) {
        return sessionHistoryCollection.find({ 'vehicle.regNumber': args.regNumber }).toArray()
      } else if (args.sessionId) {
        return sessionHistoryCollection.find({ sessionId: args.sessionId }).toArray()
      }
      return []
    },
  },

  Session: {
    driver: async (session: any) => {
      const db = await getDb()
      const driverCollection = db.collection('driver')
      const driver = await driverCollection.findOne({ _id: session.driverId })
      if (driver) {
        return driver
      }
      return {}
    },
    timestamp: (session: any) => session.timestamp.toISOString(),
  },

  Driver: {
    id: (driver: any) => driver._id,
  },

  Mutation: {
    session: () => ({}),
  },

  SessionMutation: {
    reportLocation: async (root: any, args: IReportLocationArgs) => {
      const db = await getDb()
      const activeSessionCollection = db.collection('activeSession')
      const sessionHistoryCollection = db.collection('sessionHistory')

      // Update active session
      const { sessionId, point } = args
      await activeSessionCollection.updateOne({ sessionId }, {
        $set: {
          'device.location.coordinates': point.coordinates,
          'timestamp': new Date(),
        },
      })

      // Save in session history
      const updatedSession = await activeSessionCollection.findOne({ sessionId })
      await sessionHistoryCollection.insertOne({
        ...updatedSession,
        _id: null,
      })

      return true
    },
  },
}
