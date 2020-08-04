import { SignIn } from './routes/SignIn'
import { Application } from 'express'

export const routes = (app:Application):void => {
  app.post('/sign-in', SignIn)
}