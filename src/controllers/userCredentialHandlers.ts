import { Response } from "express";
import { sign } from 'jsonwebtoken'

 const createCookie = (res:Response, payload:string) => {
  res.cookie('user', payload, {
    httpOnly: true,
    // sameSite: "none",
    expires: new Date(Date.now() + 3600000),
    path: '/',
    signed: true,
  })
}

const createToken = (userid:object):string => {
  const token = sign(userid, process.env.JWT_SCERET_KEY+'', {
    expiresIn: 3600000,
  })
  return token
}

export { createCookie, createToken }