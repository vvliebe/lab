import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import * as cors from 'koa2-cors'
import * as logger from 'koa-logger'
import * as config from 'config'

// import * as KoaSwagger from 'koa2-swagger-ui'
// app.use(KoaSwagger({
//   routePrefix: "/swagger",
//   swaggerOptions: {
//     url: `/swagger/spec.json`
//   }
// }))

import { buildRoutes } from './router'
import { connectDB } from './services/db'
import error from './middlewares/error'

const startup = () => {
  connectDB()
  const app = new Koa()
  app.use(cors())
  app.use(bodyParser())
  app.use(logger())
  app.use(error)
  buildRoutes(app)
  app.listen(12306)
}

startup()
