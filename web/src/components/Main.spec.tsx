import { MockedProvider } from '@apollo/react-testing'
import '@testing-library/jest-dom/extend-expect'
import { cleanup, fireEvent, render } from '@testing-library/react'
import React from 'react'

import activeSessions from '../../__fixtures__/activeSessions'
import sessionHistories from '../../__fixtures__/sessionHistories'
import { GET_ACTIVE_SESSIONS } from '../graphql/useGetActiveSessions'
import { GET_SESSION_HISTORY } from '../graphql/useGetHistoryBySession'
import Main from './Main'

const mocks: any = [
  {
    request: {
      query: GET_ACTIVE_SESSIONS,
    },
    result: {
      data: {
        session: {
          getActiveSessions: activeSessions,
        },
      },
    },
  },
]
for (const session of activeSessions) {
  mocks.push({
    request: {
      query: GET_SESSION_HISTORY,
      variables: {
        sessionId: session.sessionId,
      },
    },
    result: {
      data: {
        session: {
          getSessionHistory: sessionHistories.filter((s) => s.sessionId === session.sessionId),
        },
      },
    },
  })
}

describe('Main test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should display all active sessions', async () => {
    const { findByText } = render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>
    ))

    for (const session of activeSessions) {
      expect(await findByText(`${session.driver.firstName} ${session.driver.lastName}`)).toBeVisible()
      expect(await findByText(`${session.vehicle.regNumber} (${session.vehicle.vehicleType})`)).toBeVisible()
      const coord = `(${session.device.location.coordinates[1]}, ${session.device.location.coordinates[0]})`
      expect(await findByText(coord)).toBeVisible()
    }
  })

  it('should show session history', async () => {
    const { getByText, findByText } = render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <Main />
      </MockedProvider>
    ))

    for (const session of activeSessions) {
      const driverFullName = `${session.driver.firstName} ${session.driver.lastName}`
      const vehicleText = `${session.vehicle.regNumber} (${session.vehicle.vehicleType})`
      const rowRepresentative = await findByText(vehicleText)

      fireEvent.click(rowRepresentative)

      const sessionHistoryHeading = getByText(`Location history for ${driverFullName} on ${vehicleText}`)
      expect(sessionHistoryHeading).toBeVisible()
      const sessionHistoryList = sessionHistories.filter((s: any) => s.sessionId === session.sessionId)
      for (const sess of sessionHistoryList) {
        const coordText = `(${sess.device.location.coordinates[1]}, ${sess.device.location.coordinates[0]})`
        const historyRow = await findByText(coordText)
        expect(historyRow).toBeVisible()
      }
    }
  })
})
