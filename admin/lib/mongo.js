const config = require('../config')
const Mongolass = require('mongolass')

const mongolass = new Mongolass(config.mongodb)

let User = mongolass.model('user', {
  name: {type: 'string'},
  password: {type: 'string'}
})

module.exports = {
  User
}
