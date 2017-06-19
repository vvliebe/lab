const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const router = require('./routes')

const app = new Koa()

app.use(bodyParser())

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(12306)

module.exports = app
