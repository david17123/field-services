import { gql } from 'apollo-server'

// TODO There might be a way to generate these interfaces from the schema
interface IDriverInput {
  username: string,
  password: string,
}

interface IDeviceInput {
  os: string,
  osVersion: string,
}

interface ILoginArgs {
  driver: IDriverInput,
  dveice: IDeviceInput,
}

interface ILogoutArgs {
  sessionId: string,
}

interface ISetVehicleArgs {
  vehicleId: string,
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

  extend type Mutation {
    driver: DriverMutation
  }

  type DriverMutation {
    login(driver: DriverInput!, device: DeviceDetailsInput!): LoginResponse
    logout(sessionId: String): Boolean
    setVehicle(vehicleId: ID): Boolean
  }

  type LoginResponse {
    sessionToken: String
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
    login: (root: any, args: ILoginArgs) => {
      // TODO Should authenticate driver's credentials
      // TODO Create session token for validated driver
      // TODO Add activity log entry
      return {sessionToken: 'tokenStringStub', driver_id: 'D1234'}
    },
    logout: (root: any, args: ILogoutArgs) => {
      // TODO Remove session from active sessions list
      // TODO Add activity log entry
      return true
    },
    setVehicle: (root: any, args: ISetVehicleArgs) => {
      // TODO Note down that Driver is using this particular vehicle
      // TODO Add activity log entry
      return true
    },
  },
}
