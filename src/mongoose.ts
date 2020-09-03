import { createConnection, Schema } from 'mongoose'

const mailClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/mails?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const userClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/users?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false }
)

const randomBgColor = ():number => {
  return Math.ceil(Math.random() * 1000000)
}

const UserSchema:Schema = new Schema({
  username: Schema.Types.String,
  email: Schema.Types.String,
  password: Schema.Types.String,
  profilePhoto: Schema.Types.String,
  timeCreated: Schema.Types.Date,
  googleid: Schema.Types.String,
  numberOfMails: Schema.Types.Number,
  oauth: Schema.Types.Boolean,
  bgColor: {
    type: Schema.Types.Number,
    default: randomBgColor
  },
  verified: Schema.Types.Boolean,
})

const User = userClient.model('user', UserSchema)


const tokenSchema:Schema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    required: true
  },
  token: Schema.Types.String,
  expires: {
    type: Schema.Types.Date,
    default: Date.now(),
    indexes: { expires: 300000 }
  }
})

const Token = userClient.model('token', tokenSchema)

export { User, Token }