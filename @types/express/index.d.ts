import { User as UserModel } from './src/mongoose'


declare global {
  namespace Express{
    interface Request {
      currentUser: UserModel
    }
  }
}