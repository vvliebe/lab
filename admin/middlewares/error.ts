import { Context } from 'koa'
import { IHttpMessage } from '../interfaces'
export default async function (ctx: Context, next) {
  try {
    await next()
  } catch (error) {
    console.log(error)
    if (error.isBoom) {
      let {output: {statusCode: code, payload}, message} = error
      ctx.status = code,
      ctx.body = {
        code,
        message: message || payload.message,
        error: payload.error
      }
    } else {
      ctx.status = ctx.status || 500
      ctx.body = {
        code: ctx.status,
        message: error.message,
        error: error.name
      }
    }
  }  
}