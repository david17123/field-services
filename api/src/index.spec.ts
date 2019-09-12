import { MongoClient } from 'mongodb'

it('shim', () => undefined)

// The purpose of this file is to augment the global object to include
// __MONGO_URI__ and __MONGO_DB_NAME__. The import and test above are just there
// to satisfy Typescript and Jest respectively.
declare global {
  namespace NodeJS {
    interface Global { // tslint:disable-line:interface-name
      __MONGO_URI__: any
      __MONGO_DB_NAME__: any
    }
  }
}
