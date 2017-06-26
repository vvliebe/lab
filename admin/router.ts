import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as fs from 'fs'
import * as path from 'path'

import { bindRoutes } from 'trafficlight'

let controllers = []
const controllerDir = path.join(__dirname, 'controllers')
fs.readdirSync(controllerDir)
  .filter(file => path.extname(file) === '.ts')
  .forEach(file => {
    const controller = require(path.join(controllerDir, file)).default
    controllers.push(controller)
  })

export const buildRoutes = (app: Koa) => {
  const routerRoutes = new Router()
  bindRoutes(routerRoutes, controllers)
  app.use(routerRoutes.routes()).use(routerRoutes.allowedMethods())
}
