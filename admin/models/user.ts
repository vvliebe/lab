import * as DB from 'mongoose'

const UserSchema = new DB.Schema(
  {
    id: {
      type: DB.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    name: {
      type: String,
      unique: true
    },
    password: String,
    role: String
  }
)

export default DB.model('User', UserSchema)
