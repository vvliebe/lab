import * as Boom from 'Boom'
import * as config from 'config'
import { Context } from "koa";
import {updateToken} from '../services/token'

export function BasicAuth () {
  return async (ctx: Context, next) => {
    const token = ctx.cookies.get('ACCESS_TOKEN') || ctx.headers['X-ACCESS-TOKEN'] || ctx.query.accessToken
    if (!token) {
      throw Boom.unauthorized('No Access Token')
    }
    // TODO: 判断token有效性
    try {
      if (await updateToken(token)) {
        return await next()
      } else {
        throw Boom.unauthorized('invalid token')
      }
    } catch (error) {
      throw Boom.unauthorized('update token error')
    }
  }
}