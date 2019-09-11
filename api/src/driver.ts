import { gql } from 'apollo-server'

// TODO There might be a way to generate these interfaces from the schema
interface IDriverInput {
  username: string,
  password: string,
}

interface IDeviceInput {
  os: string,
  os_version: string,
}

interface ILoginArgs {
  driver: IDriverInput,
  dveice: IDeviceInput,
}

interface ISetVehicleArgs {
  vehicle_id: string,
}

export const typeDefs = gql`
  input DriverInput {
    username: String
    password: String
  }

  input DeviceDetailsInput {
    os: String
    os_version: String
  }

  extend type Mutation {
    driver: DriverMutation
  }

  type DriverMutation {
    login(driver: DriverInput!, device: DeviceDetailsInput!): LoginResponse
    setVehicle(vehicle_id: ID): Boolean
  }

  type LoginResponse {
    sessionToken: String
    driver_id: ID
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
      return {sessionToken: 'tokenStringStub', driver_id: 'D1234'}
    },
    setVehicle: (root: any, args: ISetVehicleArgs) => {
      // TODO Note down that Driver is using this particular vehicle
      return true
    },
  },
}
