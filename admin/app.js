const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

const app = new Koa()

app.use(bodyParser())

router.get('/', async function (ctx, next) {
  ctx.body = 'hello koaka'
  console.log(ctx.request.query)
  console.log(ctx.request.body)
})

router.get('/json', async (ctx, next) => {
  ctx.body = {foo: 'bar'}
})

router.get('/params', async (ctx, next) => {
  ctx.body = ctx.request.query
})

app.use(cors())

app.use(router.routes()).use(router.allowedMethods())

app.listen(12306)

module.exports = app
