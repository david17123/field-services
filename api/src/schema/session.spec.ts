import {
  getConnection,
  getDb,
  setConnectionString,
} from '../db/connection'
import { activeSessions, sessionHistories } from '../db/factory'
import { resolvers } from './session'

describe('test session end points', () => {
  beforeAll(() => {
    setConnectionString(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    const connection = await getConnection()
    await connection.close()
  })

  beforeEach(async () => {
    const db = await getDb()
    const activeSessionCollection = db.collection('activeSession')
    await activeSessionCollection.insertMany(activeSessions)
    const sessionHistoryCollection = db.collection('sessionHistory')
    await sessionHistoryCollection.insertMany(sessionHistories)
  })

  afterEach(async () => {
    const db = await getDb()
    const activeSessionCollection = db.collection('activeSession')
    activeSessionCollection.deleteMany({})
    const sessionHistoryCollection = db.collection('sessionHistory')
    sessionHistoryCollection.deleteMany({})
  })

  it('should fetch all currently active connections', async () => {
    const activeSession = await resolvers.SessionQuery.getActiveSessions()

    expect(activeSession.length).toBe(activeSessions.length)
    // TODO Do some assertions that the active sessions returned are exactly
    // what we have mocked and only what we have mocked above
  })

  it('update location for a session', async () => {
    await resolvers.SessionMutation.reportLocation(null, {
      point: {
        coordinates: [15, 23.2],
        type: 'Point',
      },
      sessionId: activeSessions[0].sessionId,
    })

    const db = await getDb()
    const activeSessionCollection = db.collection('activeSession')
    const sessionHistoryCollection = db.collection('sessionHistory')

    const activeSession = (await activeSessionCollection
      .find({ sessionId: activeSessions[0].sessionId })
      .toArray()
    )[0]
    expect(activeSession.device.location.coordinates[0]).toBe(15)
    expect(activeSession.device.location.coordinates[1]).toBe(23.2)

    const updatedSessionHistory = await sessionHistoryCollection.find().toArray()
    expect(updatedSessionHistory.length).toBe(sessionHistories.length + 1)

    const fields = Object.keys(activeSessions)
    const lastSessionHistory = updatedSessionHistory[updatedSessionHistory.length - 1]
    for (let i = 1; i < fields.length; i += 1) {
      const field: string = fields[i]
      if (field === '_id') {
        continue
      }
      expect(activeSession[field]).toEqual(lastSessionHistory[field])
    }
  })

  // TODO Write tests for the other GraphQL end points
})
