import { Router } from 'express'
import { Token, User } from '../mongoose'
import { verifyUser } from '../controllers/middlewares'
import { ErrorResponse, SuccessResponse } from '../response'
import { responseUserSkeleton } from '../controllers/skeletons'
import { createCookie, createToken } from '../controllers/userCredentialHandlers'

const ConfirmEmail = Router()

ConfirmEmail.get('/:userid/:token', verifyUser, (req, res) => {
  if(req.user) {
    const userid = req.params.userid
    const token = req.params.token
    if(userid && token){
      const userRef = req.currentUser
      if( userRef._id.toString() === userid ) {
        if(!userRef.verified){
          Token.findOne({userid: userRef._id})
          .then( tokenDocument => {
            if( tokenDocument ){
              const storedToken = tokenDocument.toObject().token
              if(token === storedToken){
                User.updateOne({_id: userRef._id}, {$set: {verified: true}})
                .then( updatedUserRef => {
                  if( updatedUserRef ){
                    User.findById(userRef._id)
                    .then( verifiedUserRef => {
                      if(verifiedUserRef){
                        const jwtToken = createToken({userid: verifiedUserRef.toObject()._id})
                        createCookie(res, jwtToken)
                        res.send(new SuccessResponse(true, responseUserSkeleton(verifiedUserRef.toObject())) )
                      } else {
                        res.send(new ErrorResponse(true, 'Something went wrong. Please try again', 'alert and try again'))
                      }
                    }, getVerifiedUserError => {
                      res.send(new ErrorResponse(true, 'Could not retrieve user information, please try again', 'alert and try again'))
                    })
                  } else {
                    // No user found.
                    res.send(new ErrorResponse(true, 'Something went wrong. Please try again', 'alert and try again'))
                  }
                }, updateUserError => {
                  // Error, Could not update the verification status
                  res.send(new ErrorResponse(true, 'Could not complete the verification. PLease try again', 'alert and try again'))
                })
              } else {
                // Invalid token supplied
                res.send(new ErrorResponse(true, 'Invalid token. Check your email and try again', 'alert'))
              }
            } else {
              // Token has expired
              res.send(new ErrorResponse(true, 'Expired Link. Get a new one and try again', 'alert and generate'))
            }
          }, findTokenError => {
            // Error, could not retrieve token
            res.send(new ErrorResponse(true, 'Error verifying the submitted token. Please try again', 'alert and try again'))
          })
        } else {
          // Already verfied user
          res.send(new ErrorResponse(true, 'Already verifed user', 'alert and redirect'))
        }
      } else {
        // Reject user does not exist
        res.send(new ErrorResponse(true, 'Operation Failed!', 'alert'))
      }
    } else {
      // Reject, Token or userid is missing
      res.send(new ErrorResponse(true, 'Damaged verification link. Check your email and try again', 'alert'))
    }
  } else {
    // The user is not signed in. Reject
    res.send(new ErrorResponse(false, 'User is not signed in. Please log in and try again', 'alert'))
  }
})
export default ConfirmEmail