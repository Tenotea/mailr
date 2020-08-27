import { Router } from 'express'
import { ErrorResponse, SuccessResponse } from '../response'
import { verifyUser } from '../controllers/middlewares'

const Status = Router()

Status.get('/', verifyUser, (req, res) => {
  res.send(req.user)
})

Status.get('/current-user', verifyUser, (req, res) => {
  if(req.user){
    res.json(new SuccessResponse(true, req.currentUser))
  } else {
    res.json(new ErrorResponse(false, 'User is not signed in', 'ignore'))
  }
})

export default Status