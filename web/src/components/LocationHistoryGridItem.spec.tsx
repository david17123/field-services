
import { MockedProvider } from '@apollo/react-testing'
import { cleanup, render } from '@testing-library/react'
import React from 'react'

import activeSessions from '../../__fixtures__/activeSessions'
import sessionHistories from '../../__fixtures__/sessionHistories'
import { GET_SESSION_HISTORY } from '../graphql/useGetHistoryBySession'
import LocationHistoryGridItem from './LocationHistoryGridItem'

describe('LocationHistoryGridItem test', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks()
  })

  it('should render location history list', async () => {
    const session = activeSessions[0]
    const sessionHistory = sessionHistories.filter((s) => s.sessionId === session.sessionId)
    const mocks = [
      {
        request: {
          query: GET_SESSION_HISTORY,
          variables: {
            sessionId: session.sessionId,
          },
        },
        result: {
          data: {
            session: {
              getSessionHistory: sessionHistory,
            },
          },
        },
      },
    ]

    const { findByText } = render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationHistoryGridItem session={session} />
      </MockedProvider>
    ))

    for (const sess of sessionHistory) {
      const coordValue = `(${sess.device.location.coordinates[1]}, ${sess.device.location.coordinates[0]})`
      const targetElement = await findByText(coordValue)
      expect(targetElement).toBeTruthy()
    }
  })

  it('should render loading state', async () => {
    const session = activeSessions[0]
    const sessionHistory = sessionHistories.filter((s) => s.sessionId === session.sessionId)
    const mocks = [
      {
        request: {
          query: GET_SESSION_HISTORY,
          variables: {
            sessionId: session.sessionId,
          },
        },
        result: {
          data: {
            session: {
              getSessionHistory: sessionHistory,
            },
          },
        },
      },
    ]

    const { queryByText } = render((
      <MockedProvider mocks={mocks} addTypename={false}>
        <LocationHistoryGridItem session={session} />
      </MockedProvider>
    ))

    for (const sess of sessionHistory) {
      const coordValue = `(${sess.device.location.coordinates[1]}, ${sess.device.location.coordinates[0]})`
      expect(queryByText(coordValue)).toBeFalsy()
    }
  })
})
