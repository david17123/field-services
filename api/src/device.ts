import { gql } from 'apollo-server'

// TODO There might be a way to generate these interfaces from the schema
interface IGeojsonPoint {
  type: 'Point',
  coordinates: number[],
}

interface IReportLocationArgs {
  sessioNToken: string,
  point: IGeojsonPoint,
}

export const typeDefs = gql`
  input GeojsonPointInput {
    type: String
    coordinates: [Float]
  }

  extend type Mutation {
    device: DeviceMutation
  }

  type DeviceMutation {
    reportLocation(sessionToken: String, point: GeojsonPointInput!): Boolean
  }
`

export const resolvers = {
  Mutation: {
    device: () => ({}),
  },

  DeviceMutation: {
    reportLocation: (root: any, args: IReportLocationArgs) => {
      // TODO Store location to database
      return true
    },
  },
}
