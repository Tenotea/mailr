import { createConnection, Schema } from 'mongoose'

const mailClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/mails?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const userClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/users?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true }
)

const UserSchema:Schema = new Schema({
  username: Schema.Types.String,
  email: Schema.Types.String,
  password: Schema.Types.String,
  profilePhoto: Schema.Types.String,
  timeCreated: Schema.Types.Date,
  googleid: Schema.Types.Number,
  numberOfMails: Schema.Types.Number,
  oauth: Schema.Types.Boolean,
  verified: Schema.Types.Boolean,
})

const User = userClient.model('user', UserSchema)

export { User }