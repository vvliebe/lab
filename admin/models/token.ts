import * as DB from 'mongoose'

const TokenSchema = new DB.Schema(
  {
    id: {
      type: DB.Schema.Types.ObjectId,
      index: true,
      required: true,
      auto: true
    },
    uid: {
      type: String,
      unique: true
    },
    token: {
      type: String,
      unique: true
    },
    last_login_at: DB.Schema.Types.Date
  }
)

export default DB.model('Token', TokenSchema)
