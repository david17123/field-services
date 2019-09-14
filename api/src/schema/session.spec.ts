import {
  getConnection,
  getDb,
  setConnectionString,
} from '../db/connection'
import { activeSessions, sessionHistories } from '../db/fixtures'
import { ISession } from '../db/modelTypes'
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

  it('should fetch all currently active sessions', async () => {
    const activeSession = await resolvers.SessionQuery.getActiveSessions()

    expect(activeSession.length).toBe(activeSessions.length)
    // TODO Do some assertions that the active sessions returned are exactly
    // what we have mocked and only what we have mocked above
  })

  it('fetch session history by driverId', async () => {
    const selectedSession = activeSessions[0]
    const history = await resolvers.SessionQuery.getSessionHistory(null, {
      driverId: selectedSession.driverId.toHexString(),
    })

    expect(history.length).toBe(sessionHistories.filter(
      (s: ISession) => s.driverId.toHexString() === selectedSession.driverId.toHexString(),
    ).length)
  })

  it('fetch session history by vehicle regNumber', async () => {
    const selectedSession = activeSessions[0]
    const history = await resolvers.SessionQuery.getSessionHistory(null, {
      regNumber: selectedSession.vehicle.regNumber,
    })

    expect(history.length).toBe(sessionHistories.filter(
      (s: ISession) => s.vehicle.regNumber === selectedSession.vehicle.regNumber,
    ).length)
  })

  it('fetch session history by vehicle sessionId', async () => {
    const selectedSession = activeSessions[0]
    const history = await resolvers.SessionQuery.getSessionHistory(null, {
      sessionId: selectedSession.sessionId,
    })

    expect(history.length).toBe(sessionHistories.filter(
      (s: ISession) => s.sessionId === selectedSession.sessionId,
    ).length)
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

    const activeSession = await activeSessionCollection.findOne({ sessionId: activeSessions[0].sessionId })
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
})
