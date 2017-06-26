import * as config from 'config'
import * as DB from 'mongoose'

export function connectDB () {
  require('mongoose').Promise = Promise
  let uri
  if (process.env.NODE_ENV === 'prod') {
    uri = config.get('MONGO.PROD')
  } else {
    uri = config.get('MONGO.DEV')
  }
  DB.connect(uri)
}