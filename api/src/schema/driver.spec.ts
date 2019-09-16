import {
  getConnection,
  getDb,
  setConnectionString,
} from '../db/connection'
import { activeSessions, activityLogs, drivers } from '../db/fixtures'
import { resolvers } from './driver'

describe('test driver end points', () => {
  beforeAll(() => {
    setConnectionString(global.__MONGO_URI__, global.__MONGO_DB_NAME__)
  })

  afterAll(async () => {
    const connection = await getConnection()
    await connection.close()
  })

  beforeEach(async () => {
    const db = await getDb()
    const driverCollection = db.collection('driver')
    await driverCollection.insertMany(drivers)
    const activeSessionCollection = db.collection('activeSession')
    await activeSessionCollection.insertMany(activeSessions)
    const activityLogCollection = db.collection('activityLog')
    await activityLogCollection.insertMany(activityLogs)
  })

  afterEach(async () => {
    const db = await getDb()
    const driverCollection = db.collection('driver')
    driverCollection.deleteMany({})
    const activeSessionCollection = db.collection('activeSession')
    activeSessionCollection.deleteMany({})
    const activityLogCollection = db.collection('activityLog')
    activityLogCollection.deleteMany({})
  })

  it('login user and start a new active session', async () => {
    const loginResult = await resolvers.DriverMutation.login(null, {
      device: {
        os: 'ios',
        osVersion: '10.0.0',
      },
      driver: {
        password: drivers[0].password,
        username: drivers[0].username,
      },
    })

    expect(loginResult.driverId.toHexString()).toEqual(drivers[0]._id.toHexString())
  })
})
