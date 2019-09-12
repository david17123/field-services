import ApolloClient from 'apollo-boost'

export const client = new ApolloClient({
  uri: 'http://api:4000',
})
