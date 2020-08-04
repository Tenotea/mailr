import { Router, Request, Response } from 'express'

export const SignIn = Router()

SignIn.post('/sign-in', (req:Request, res:Response) => {
  res.send('User is being signed in here')
})
