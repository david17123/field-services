import { ObjectID } from 'mongodb'

export interface IGeojsonPoint {
  type: 'Point'
  coordinates: number[]
}

export interface IDevice {
  os: string
  osVersion: string
  location?: IGeojsonPoint
}

export interface IVehicle {
  regNumber: string
  vehicleType: string
}

export interface ISession {
  _id: ObjectID
  sessionId: string
  device: IDevice
  driverId: ObjectID
  vehicle?: IVehicle
  timestamp: Date
}

export interface IDriver {
  _id: ObjectID
  firstName: string
  lastName: string
  mobileNumber: string
  profilePicture: string
  username: string
  password: string
  lastLogin: Date
}

export interface IActivityLog {
  _id: ObjectID
  type: 'login' | 'logout' | 'setVehicle'
  driverId: ObjectID
  success: boolean
  timestamp: Date
  vehicle?: IVehicle
}
