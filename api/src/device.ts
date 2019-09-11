import { gql } from 'apollo-server'

interface IDeviceDetails {
  os: string,
  os_version: string,
}

interface IGeojsonPoint {
  type: 'Point',
  coordinates: number[],
}

export const typeDefs = gql`
  input GeojsonPointInput {
    type: String,
    coordinates: [Float]
  }

  extend type Mutation {
    device(os: String, os_version: String): DeviceMutation
  }

  type DeviceMutation {
    reportLocation(point: GeojsonPointInput!): Boolean
  }
`

export const resolvers = {
  Mutation: {
    device: (root: any, args: any) => {
      return args
    },
  },

  DeviceMutation: {
    reportLocation: (root: IDeviceDetails, args: {point: IGeojsonPoint}) => {
      // TODO Store location to database
      return true
    },
  },
}
