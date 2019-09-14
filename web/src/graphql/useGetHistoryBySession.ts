import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ISession } from './useGetActiveSessions'

export const GET_SESSION_HISTORY = gql`
  query getSessionHistory($sessionId: ID) {
    session {
      getSessionHistory(sessionId: $sessionId) {
        sessionId
        device {
          location {
            type
            coordinates
          }
        }
        driver {
          id
          firstName
          lastName
        }
        vehicle {
          regNumber
          vehicleType
        }
        timestamp
      }
    }
  }
`

export default function useGetHistoryBySession(sessionId: string) {
  const { data, loading } = useQuery(GET_SESSION_HISTORY, {
    variables: {
      sessionId,
    },
  })

  let history: ISession[] | null = null
  if (!loading && data) {
    history = data.session.getSessionHistory.map((session: any) => ({
      ...session,
      timestamp: new Date(session.timestamp),
    }))
  }

  return {
    history,
    loading,
  }
}
