import { compareSync } from "bcryptjs";
import { Response } from "express";
import { sign, verify } from 'jsonwebtoken'
import crypto from 'crypto'
import { MailTokenInterface } from "./interface";

const createCookie = (res:Response, payload:string) => {
  res.cookie('user', payload, {
    httpOnly: true,
    sameSite: "none",
    secure: true
    expires: new Date(Date.now() + 3600000),
    path: '/',
    signed: true,
  })
}

const createToken = (userid:object):string => {
  const token = sign(userid, process.env.JWT_SECRET_KEY+'', {
    expiresIn: 3600000,
  })
  return token
}

const verifyToken = (token:string) => {
  let user
  try {
    user = verify(token, process.env.JWT_SECRET_KEY+'')
  } catch (err) {
    user = err
  }
  return user
}

const passwordMatches = (fromUser:string, fromDb:string):boolean => {
  return compareSync(fromUser, fromDb)
}

const verificationLinkGenerate = (userid:string):MailTokenInterface => {
  const token = crypto.randomBytes(20).toString('hex')
  return {
    link: `http://localhost:3000/verify/${userid}/${token}`,
    token
  }
}

export { createCookie, createToken, verifyToken, passwordMatches, verificationLinkGenerate }
