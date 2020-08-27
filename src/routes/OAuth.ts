import { Router, Request, Response, NextFunction } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../mongoose'
import { createToken, createCookie} from '../controllers/userCredentialHandlers'
import { verifyUser } from '../controllers/middlewares'
import { UserSkeleton } from '../controllers/skeletons'

const OAuth = Router()
const clientRedirectURL = 'http://localhost:3000'

// Configure passport
passport.initialize()
passport.use(
  new GoogleStrategy({
    clientID: process.env.OAUTH_CLIENTID+'',
    clientSecret: process.env.OAUTH_CLIENTSECRET+'',
    callbackURL: '/oauth/redirect',
    scope: ['profile', 'email']
  },

  (accessToken, refreshToken, profile, done) => {
    User.findOne({googleid: profile.id})
    .then( currentUser => {
      if(currentUser){
        return done(undefined, createToken({userid: currentUser._id}))
      } else {
        const user = new UserSkeleton(profile.displayName, profile._json.email, null, profile._json.picture, profile.id, true)
        User.create(user).then( newUser => {
          return done(undefined, createToken({userid: newUser._id}))
        })
      }
    })
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

OAuth.get('/', verifyUser, function name(req:Request, res:Response, next:NextFunction) {
  req.user ? res.redirect(`${clientRedirectURL}/accpanel`) : next()
}, passport.authenticate('google'))

OAuth.get('/redirect', passport.authenticate('google', {
  failureRedirect: `${clientRedirectURL}/client-area`
}), (req:Request, res:Response) => {
  createCookie(res, req.user+'')
  res.send('One moment...')
  res.redirect(`${clientRedirectURL}/accpanel`)
})

export default OAuth