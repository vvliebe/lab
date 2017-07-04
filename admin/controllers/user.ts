import { Controller, Post, Get, Body, QueryParam, Use } from 'trafficlight'
import * as Boom from 'boom'
import * as config from 'config'

import userModel from '../models/user'
import { IHttpMessage } from '../interfaces' 
import { formatMessage } from '../utils/format'
import { BasicAuth } from '../middlewares/auth'
import {createToken} from '../services/token'

@Controller('/user')
export default class UserController {
  @Post('/login')
  public async login(@Body() body): Promise<IHttpMessage> {
    let {name, password} = body
    if (!name) throw Boom.badRequest('用户名不能为空')
    if (!password) throw Boom.badRequest('密码不能为空')
    
    let _user: any = await userModel.findOne({ name })
    if (!_user) throw Boom.badImplementation('用户名不存在')
    if (_user.get('password') === password) {
      let user = _user.toJSON()
      let { token } = await createToken(user)
      delete user._id
      delete user.__v
      delete user.password
      return formatMessage(200, 'success', {token, user})
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

  @Get('/checkLogin')
  @Use(BasicAuth())
  public async check(@Body() body): Promise<IHttpMessage> {
    return formatMessage(200, 'success')
  }
}