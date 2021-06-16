import { Router, json } from 'express'
import { ErrorResponse, SuccessResponse } from '../response'
import { verifyUser } from '../controllers/middlewares'
import { FormSignInJoiValidate } from '../controllers/validator'
import { User } from '../mongoose'
import { createCookie, createToken, passwordMatches } from '../controllers/userCredentialHandlers'
import { responseUserSkeleton } from '../controllers/skeletons'

const SignIn = Router()
const clientRedirectURL = process.env.CLIENT_APP_URL
const jsonParser = json({strict: true})

SignIn.post('/', verifyUser, jsonParser, (req, res) => {
  if(req.user){
    res.redirect(`${clientRedirectURL}/accpanel`)
  } else {
    const { error, value } = FormSignInJoiValidate.validate(req.body)
    if( error ) {
      res.send(new ErrorResponse(false, error.message, 'alert'))
    } else {
      User.findOne({email: value.email})
      .then( existentUser => {
        if(existentUser){
          if(existentUser.toObject().oauth){
            res.send(new ErrorResponse(false, 'This method of sign in is not allowed for this user', 'alert'))
          } else {
            const passwordIsAMatch = passwordMatches(value.password, existentUser.toObject().password)
            if(passwordIsAMatch){
              const token = createToken({userid: existentUser._id})
              createCookie(res, token)
              const clientDetails = responseUserSkeleton(existentUser.toObject())
              res.send(new SuccessResponse(true, clientDetails))
            } else {
              res.send(new ErrorResponse(false, 'Incorrect password!', 'alert'))
            }
          }
        } else {
          res.send(new ErrorResponse(false, 'This email account is not associated with any account', 'alert' ))
        }
      }, () => {
        res.send(new ErrorResponse(false, 'Error retrieving the account. Try again', 'alert'))
      })
    }
  }
})



export default SignIn
