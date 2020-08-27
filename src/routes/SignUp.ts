import { Router, Request, Response, json } from 'express'
import { User } from '../mongoose'
import { verifyUser } from '../controllers/middlewares'
import { FormSignUpJoiValidate } from '../controllers/validator'
import { responseUserSkeleton, UserSkeleton } from '../controllers/skeletons'
import { createCookie, createToken } from '../controllers/userCredentialHandlers'
import { ErrorResponse } from '../response'

const SignUp = Router()
const jsonParser = json({strict: true})
const clientRedirectUrl = 'http://localhost:3000'

// Sign up route
SignUp.post('/', jsonParser, verifyUser, (req:Request, res:Response) => {
  if (req.user) {
    res.redirect(`${clientRedirectUrl}/accpanel`)
  } else {
    const { error, value } = FormSignUpJoiValidate.validate(req.body)
    const existentChecks = [User.findOne({username: value.username}), User.findOne({email: value.email})]
    if(!error){
      Promise.all(existentChecks)
      .then( existingUser => {
        if( existingUser[0] && existingUser[1] ){
          res.send( new ErrorResponse(false, 'An account associated with this username and email exists', 'alert'))
        } else if(existingUser[0] && !existingUser[1]){
          res.send( new ErrorResponse(false, 'An account associated with this username exists', 'alert'))
        } else if( existingUser[1] && !existingUser[0]){
          res.send( new ErrorResponse(false, 'An account associated with this email address exists', 'alert'))
        } else {
          const user = new UserSkeleton(value.username, value.email, value.password, null, null, false)
          user.hashPassword()
          User.create(user)
          .then( newUser => {
            const token = createToken({userid: newUser._id})
            createCookie(res, token)
            res.send(responseUserSkeleton(newUser))
          }, () => {
            res.send(new ErrorResponse(false, 'Could not create the account', 'alert'))
          })
        }
      }, () => {
        res.send( new ErrorResponse(false, 'Could not confirm account availability', 'alert'))
      })
    } else {
      // Will change this when the regex has been fixed
      res.send( new ErrorResponse(false, error.message, 'alert') )
    }
  }
})

export default SignUp