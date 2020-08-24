import { createConnection, Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const mailClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/mails?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true }
)
const userClient = createConnection (
  encodeURI(`mongodb+srv://thetenocrew:${process.env.MONGO_PASSWORD}@mailr.ejcmb.gcp.mongodb.net/users?retryWrites=true&w=majority`),
  { useNewUrlParser: true, useUnifiedTopology: true }
)



const UserSchema:Schema = new Schema({
  googleid: Schema.Types.Number,
  firstname: Schema.Types.String,
  lastname: Schema.Types.String,
  displayName: Schema.Types.String,
  email: Schema.Types.String,
  profilePhoto: Schema.Types.String,
  oauth: Schema.Types.Boolean,
  password: Schema.Types.String,
  verified: Schema.Types.Boolean,
  numberOfMails: Schema.Types.Number,
  timeCreated: Schema.Types.Date
})

const User = userClient.model('user', UserSchema)

export { User }