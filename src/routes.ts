import OAuth from './routes/OAuth'
import SignUp  from './routes/SignUp'
import Status from './routes/Status'
import SignIn from './routes/SignIn'
import ConfirmEmail from './routes/ConfirmEmail'
import { Application } from 'express'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import ActivationLink from './routes/ActivationLink'

export const routes = (app:Application):void => {
  app.use(cors({
    origin: true,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST']
  }))
  app.use(passport.initialize())
  app.use(cookieParser(process.env.COOKIE_SECRET))
  app.use('/oauth', OAuth)
  app.use('/sign-up', SignUp)
  app.use('/sign-in', SignIn)
  app.use('/status', Status)
  app.use('/verify-email', ConfirmEmail)
  app.use('/activation-link', ActivationLink)
  app.get('/logout', (req, res) => {
    res.clearCookie('user').redirect('http://localhost:3000')
  })
}
