import { Controller, Post, Get, Body, QueryParam } from 'trafficlight'
import * as Boom from 'boom'

import userModel from '../models/user'
import { IHttpMessage } from '../interfaces' 
import { formatMessage } from '../utils/format'

@Controller('/user')
export default class UserController {
  @Post('/login')
  public async login(@Body() body): Promise<IHttpMessage> {
    let {name, password} = body
    console.log(name, password)
    if (!name) throw Boom.badRequest('用户名不能为空')
    if (!password) throw Boom.badRequest('密码不能为空')
    
    let user = await userModel.findOne({ name })

    if (!user) throw Boom.badImplementation('用户名不存在')
    if (user.get('password') === password) {
      return formatMessage(200, 'success')
    } else {
      throw Boom.badImplementation('密码错误')
    }
  }

  @Post('/add')
  public async add(@Body() body): Promise<IHttpMessage> {
    let {name, password} = body
    if (!name) throw Boom.badRequest('用户名不能为空')
    if (!password) throw Boom.badRequest('密码不能为空')

    let users = await userModel.find()
    if (users && users.length > 0) {
      throw Boom.badImplementation('注册失败')
    }
    await userModel.create({name, password, role: 'admin'})
    return formatMessage(200, 'success')
  }
}