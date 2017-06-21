const Router = require('koa-router')
const userModel = require('../models/user')

const router = new Router({
  prefix: 'user'
})

router.get('/', async (ctx, next) => {
  let {name} = ctx.request.query
  console.log(name)
  let user = await userModel.getUserByName(name)
  ctx.body = user
})

router.post('/login', async (ctx, next) => {
  let {name, password} = ctx.request.body
  try {
    let create = await userModel.create({name, password})
    ctx.body = {
      code: '200',
      msg: '登陆成功'
    }
  } catch (e) {
    ctx.body = {
      code: '500',
      msg: '登陆失败'
    }
  }
})

module.exports = router
