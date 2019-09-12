import { MongoClient } from 'mongodb'

let url = process.env.DB_URL ? process.env.DB_URL : 'mongodb://db:27017'
let db = 'fieldservices'

export const setConnectionString = (dbUrl: string = null, dbName: string = null) => {
  if (dbUrl) {
    url = dbUrl
  }
  if (dbName) {
    db = dbName
  }
}

export const getConnection = () => {
  return MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

export const getDb = async () => {
  const connection = await getConnection()
  return connection.db(db)
}
