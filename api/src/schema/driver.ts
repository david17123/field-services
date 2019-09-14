import { gql } from 'apollo-server'
import uuid4 from 'uuid/v4'

import { getDb } from '../db/connection'
import { IActivityLog, IDriver, ISession } from '../db/modelTypes'

// TODO There might be a way to generate these interfaces from the schema
interface IDriverInput {
  username: string
  password: string
}

interface IDeviceInput {
  os: string
  osVersion: string
}

interface IVehicleInput {
  regNumber: string
  vehicleType: string
}

interface ILoginArgs {
  driver: IDriverInput
  device: IDeviceInput
}

interface ILogoutArgs {
  sessionId: string
}

interface ISetVehicleArgs {
  sessionId: string
  vehicle: IVehicleInput
}

export const typeDefs = gql`
  input DriverInput {
    username: String
    password: String
  }

  input DeviceDetailsInput {
    os: String
    osVersion: String
  }

  input VehicleInput {
    regNumber: String
    vehicleType: String
  }

  extend type Mutation {
    driver: DriverMutation
  }

  type DriverMutation {
    login(driver: DriverInput!, device: DeviceDetailsInput!): LoginResponse
    logout(sessionId: String): Boolean
    setVehicle(sessionId: String, vehicle: VehicleInput!): Boolean
  }

  type LoginResponse {
    sessionId: String
    driverId: ID
  }
`

export const resolvers = {
  Mutation: {
    driver: (root: any, args: any) => {
      return args
    },
  },

  DriverMutation: {
    login: async (root: any, args: ILoginArgs) => {
      const db = await getDb()

      // TODO This validation is just a stub, not a proper user authentication
      const driverCollection = db.collection('driver')
      const driver: IDriver = await driverCollection.findOne({
        password: args.driver.password,
        username: args.driver.username,
      })
      if (!driver) {
        throw new Error('Invalid credentials')
      }

      // Create new session
      const newSession: ISession = {
        _id: null,
        device: args.device,
        driverId: driver._id,
        sessionId: uuid4(),
        timestamp: new Date(),
      }
      const activeSessionCollection = db.collection('activeSession')
      activeSessionCollection.insertOne(newSession)

      // Log in activity log
      const activityLogEntry: IActivityLog = {
        _id: null,
        driverId: driver._id,
        success: true,
        timestamp: new Date(),
        type: 'login',
      }
      const activityLogCollection = db.collection('activityLog')
      activityLogCollection.insertOne(activityLogEntry)

      return { sessionId: newSession.sessionId, driverId: driver._id }
    },
    logout: async (root: any, args: ILogoutArgs) => {
      const db = await getDb()

      const activeSessionCollection = db.collection('activeSession')
      const sessionToRemove = await activeSessionCollection.findOne({ sessionId: args.sessionId })

      if (sessionToRemove) {
        await activeSessionCollection.remove({ _id: sessionToRemove._id })

        // Log in activity log
        const activityLogEntry: IActivityLog = {
          _id: null,
          driverId: sessionToRemove.driverId,
          success: true,
          timestamp: new Date(),
          type: 'logout',
        }
        const activityLogCollection = db.collection('activityLog')
        activityLogCollection.insertOne(activityLogEntry)

        return true
      }
      return false
    },
    setVehicle: async (root: any, args: ISetVehicleArgs) => {
      const db = await getDb()

      const activeSessionCollection = db.collection('activeSession')

      // Update active session
      const { sessionId, vehicle } = args
      const session = await activeSessionCollection.findOne({ sessionId })
      if (session) {
        await activeSessionCollection.updateOne({ sessionId }, {
          $set: {
            timestamp: new Date(),
            vehicle,
          },
        })

        // Log in activity log
        const activityLogEntry: IActivityLog = {
          _id: null,
          driverId: session.driverId,
          success: true,
          timestamp: new Date(),
          type: 'setVehicle',
        }
        const activityLogCollection = db.collection('activityLog')
        activityLogCollection.insertOne(activityLogEntry)

        return true
      }
      return false
    },
  },
}
