const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

fs.readdirSync(__dirname)
  .filter(file => path.extname(file) === '.js' && file !== 'index.js')
  .forEach(file => {
    const route = require(path.join(__dirname, file))
    router.use(route.routes(), route.allowedMethods())
  })

// router.get('/', async (ctx, next) => {
//   ctx.body = 'hello koaka2'
//   console.log(ctx.request.query)
//   console.log(ctx.request.body)
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {foo: 'bar'}
// })

// router.get('/params', async (ctx, next) => {
//   ctx.body = ctx.request.query
// })

module.exports = router;