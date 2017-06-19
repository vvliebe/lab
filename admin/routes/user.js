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

router.post('/create', async (ctx, next) => {
  let {name, password} = ctx.request.body
  try {
    let create = await userModel.create({name, password})
    console.log(create.ops[0])
    ctx.body = {
      code: '200',
      msg: '添加成功'
    }
  } catch (e) {
    ctx.body = {
      code: '500',
      msg: '添加失败'
    }
  }
})

module.exports = router
