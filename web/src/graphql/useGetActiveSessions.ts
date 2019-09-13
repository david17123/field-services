import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { ISession } from './useGetActiveSessions'

interface IGeojsonPoint {
  type: 'Point'
  coordinates: number[]
}

interface IDevice {
  os: string
  osVersion: string
  location: IGeojsonPoint
}

interface IDriver {
  id: string
  firstName: string
  lastName: string
}

interface IVehicle {
  regNumber: string
  vehicleType: string
}

export interface ISession {
  sessionId: string
  device: IDevice
  driver: IDriver
  vehicle: IVehicle
  timestamp: Date
}

const GET_ACTIVE_SESSIONS = gql`
  query getActiveSessions {
    session {
      getActiveSessions {
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

export default function useGetActiveSessions() {
  const { data, loading } = useQuery(GET_ACTIVE_SESSIONS)

  let activeSessions: ISession[] | null = null
  if (!loading && data) {
    activeSessions = data.session.getActiveSessions.map((session: any) => ({
      ...session,
      timestamp: new Date(session.timestamp),
    }))
  }

  return {
    activeSessions,
    loading,
  }
}
