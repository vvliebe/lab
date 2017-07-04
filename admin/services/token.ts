import tokenModel from '../models/token'
import {IUser} from '../interfaces'
const uuid = require('uuid/v4')

const expiredIn = 1000 * 60 * 30

export async function createToken (user: IUser): Promise<any> {
  let token = uuid()
  let last_login_at = new Date()
  let uid = user.id
  let tokenRecord = await tokenModel.findOne({uid})
  if (!tokenRecord) {
    tokenRecord = await tokenModel.create({token, uid, last_login_at})
  } else {
    tokenRecord = await tokenModel.findOneAndUpdate({uid}, {$set: {token, last_login_at}}, { new: true })
  }
  return tokenRecord.toJSON()
}

export async function updateToken (token: string) {
  let tokenRecord = await tokenModel.findOne({token})
  if (!tokenRecord) return false
  let last_login_at = tokenRecord.get('last_login_at')
  let now = new Date()
  if (now.getTime() - last_login_at.getTime() > expiredIn) return false
  await tokenModel.findOneAndUpdate({token}, { $set: {last_login_at: now} }, { new: true })
  return true
}
