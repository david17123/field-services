import { ApolloServer, gql } from 'apollo-server'
import { merge } from 'lodash'

import {
  resolvers as driverResolvers,
  typeDefs as driverTypeDefs,
} from './schema/driver'
import {
  resolvers as sessionResolvers,
  typeDefs as sessionTypeDefs,
} from './schema/session'

const baseTypeDefs = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`
const resolvers = merge(
  {},
  sessionResolvers,
  driverResolvers,
)

const typeDefs = [
  baseTypeDefs,
  sessionTypeDefs,
  driverTypeDefs,
]

const server = new ApolloServer({ resolvers, typeDefs })

// TODO Need to disable GraphQL Playground on production
server.listen({
  host: '0.0.0.0',
  port: 4000,
}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`) // tslint:disable-line:no-console
})
