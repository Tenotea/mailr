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
    User.findOne({email: profile._json.email})
    .then( currentUser => {
      if(currentUser){
        if(currentUser.toObject().oauth && (currentUser.toObject().googleid === profile.id)){
          return done(undefined, createToken({userid: currentUser._id}))
        } else {
          return done(undefined, false)
        }
      } else {
        const user = new UserSkeleton(profile.displayName, profile._json.email, null, profile._json.picture, profile.id, true)
        User.create(user).then( newUser => {
          return done(undefined, createToken({userid: newUser._id}))
        })
      }
    })
  }
))

OAuth.get('/', verifyUser,
  (req:Request, res:Response, next:NextFunction) => {
    req.user ? res.redirect(`${clientRedirectURL}/accpanel`) : next()
  }, passport.authenticate('google', {session: false, failureFlash: true, failureRedirect: `${clientRedirectURL}/client-area`})
)

OAuth.get('/redirect', passport.authenticate('google', {
  session: false,
  failureFlash: true,
  failureRedirect: `${clientRedirectURL}/client-area?error=This sign in method is not associated with this account!`
}), (req:Request, res:Response) => {
      createCookie(res, req.user+'')
      res.redirect(`${clientRedirectURL}/accpanel`)
})

export default OAuth