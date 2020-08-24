import { Router, Request, Response } from 'express'
import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User } from '../mongoose'
import { createToken, createCookie} from '../controllers/userCredentialHandlers'
import dotenv from 'dotenv'
dotenv.config();

export const OAuth = Router()

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
        const user  = {
          googleid: profile.id,
          firstname: profile._json.family_name,
          lastname: profile._json.given_name,
          displayName: profile.displayName,
          email: profile._json.email,
          profilePhoto: profile._json.picture,
          oauth: true,
          verified: true,
          numberOfMails: 0,
          timeCreated: Date.now()
        }
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

OAuth.get('/', passport.authenticate('google'))

OAuth.get('/redirect', passport.authenticate('google', {
  failureRedirect: 'http://localhost:3000/client-area'
}), (req:Request, res:Response) => {
  createCookie(res, req.user+'')
  res.send('redirecting...')
})