import { Router } from 'express'
import { User, Token } from '../mongoose'
import { verifyUser } from '../controllers/middlewares'
import { verificationLinkGenerate } from '../controllers/userCredentialHandlers'
import sendVerificationMail from '../controllers/verificationMailer'
import { SuccessResponse, ErrorResponse } from '../response'

const ActivationLink = Router()

ActivationLink.get('/', verifyUser, (req, res) => {
  if(req.user){
    if(!req.currentUser.verified){
      const verificationLink = verificationLinkGenerate(req.currentUser._id)
      User.findById(req.currentUser._id)
      .then( unverifedUserRef => {
        if(unverifedUserRef){
          Token.findOneAndDelete({userid: unverifedUserRef.toObject()._id})
          .then( deletedTokenRef => {
            Token.create({
              userid: unverifedUserRef.toObject()._id,
              token: verificationLink.token
            }).then( newTokenRef => {
              sendVerificationMail(unverifedUserRef.toObject(), verificationLink.link)
              .then( sentMailDetails => {
                res.send(new SuccessResponse(true, {message: 'Activation Link sent!'}))
              }, sendMailError => {
                // Error sending mail
                res.send(new ErrorResponse(true, 'Activation Link not sent!', 'alert and try again'))
              })
            }, createTokenError => {
              // Error creating token
              res.send(new ErrorResponse(true, 'Error generating activation link', 'alert and try again'))
            })
          }, deleteTokenError => {
            // Error deleting token
            res.send(new ErrorResponse(true, 'Something unexpected occured', 'alert and try again'))
          })
        } else {
          // User does not exist
          res.send(new ErrorResponse(true, 'You are trying to generate an activation link for a non-existent user!', 'alert'))
        }
      }, fetchUnverifiedUserError => {
        res.send(new ErrorResponse(true, 'Could not retrive user information!', 'alert and try again'))
      })
    } else {
      // Already verified user
      res.send(new ErrorResponse(true, 'Already verified user', 'alert and redirect'))
    }
  } else {
    // User is not signed in
    res.send( new ErrorResponse(false, 'You are not signed in. Log in to your account and try again', 'alert'))
  }
})

// Delete associated token if any exists
// Check if user is verified

export default ActivationLink