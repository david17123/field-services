import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ISession } from './useGetActiveSessions'

const GET_ACTIVE_SESSIONS = gql`
  query getSessionHistory($sessionId: String) {
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
  const { data, loading } = useQuery(GET_ACTIVE_SESSIONS, {
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
