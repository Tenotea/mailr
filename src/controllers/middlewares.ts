import { Request, Response, NextFunction } from 'express'
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken'
import { ErrorResponse } from '../response'
import { User } from '../mongoose'
import { verifyToken } from './userCredentialHandlers'

const verifyUser = (req:Request, res:Response, next:NextFunction) => {
  if( req.signedCookies.user ){
    const user = verifyToken(req.signedCookies.user)
    if(user instanceof TokenExpiredError){
      req.user = false
      next()
    } else if (user instanceof JsonWebTokenError){
      req.user = false
      next()
    } else {
      if(user.userid){
        User.findById(user.userid)
        .then( currentUser => {
          if(currentUser){
            req.user = true
            req.currentUser = currentUser
            next()
          } else {
            req.user = false
            next()
          }
        }, () => {
          req.user = false
          res.send(new ErrorResponse(false, 'Could not verify user\'s status', 'alert and try again'))
        })
      } else {
        req.user = false
        next()
      }
    }
  } else {
    req.user = false
    next()
  }
}

export { verifyUser }