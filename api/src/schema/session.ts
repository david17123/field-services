import { gql } from 'apollo-server'

import { getDb } from '../db/connection'

// TODO There might be a way to generate these interfaces from the schema
interface IGeojsonPoint {
  type: 'Point',
  coordinates: number[],
}

interface IReportLocationArgs {
  sessionId: string,
  point: IGeojsonPoint,
}

interface IGetSessionHistoryArgs {
  driverId: string,
  regNumber: string,
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
    getActiveSessions: Session
    getSessionHistory(driverId: String, regNumber: String): [Session]
  }

  type Session {
    sessionId: String
    device: Device
    driverId: String
    vehicle: Vehicle
    timestamp: String
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
    reportLocation(sessionId: String, point: GeojsonPointInput!): Boolean
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
        return sessionHistoryCollection.find({ driverId: args.driverId }).toArray()
      } else if (args.regNumber) {
        return sessionHistoryCollection.find({ 'vehicle.regNumber': args.regNumber }).toArray()
      }
      return []
    },
  },

  Mutation: {
    session: () => ({}),
  },

  SessionMutation: {
    reportLocation: async (root: any, args: IReportLocationArgs) => {
      const db = await getDb()
      const activeSessionCollection = db.collection('activeSession')
      const sessionHistoryCollection = db.collection('sessionHistory')

      const { sessionId, point } = args
      await activeSessionCollection.updateOne({ sessionId }, {
        $set: {
          'device.location.coordinates': point.coordinates,
          'timestamp': new Date(),
        },
      })
      const updatedSession = (await activeSessionCollection.find({ sessionId }).toArray())[0]
      await sessionHistoryCollection.insertOne({
        ...updatedSession,
        _id: null,
      })

      return true
    },
  },
}
