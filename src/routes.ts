import { OAuth } from './routes/OAuth'
import { Application } from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
// import cors from 'cors'

dotenv.config()

export const routes = (app:Application):void => {
  app.use(passport.initialize())
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use('/oauth', OAuth)
}