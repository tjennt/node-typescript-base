import { NextFunction, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { error, success } from '../common/responses';

dotenv.config()

if (!process.env.TOKEN_SECRET_KEY){
    process.exit(1)
}
const TOKEN_SECRET_KEY: string = process.env.TOKEN_SECRET_KEY

const getTokenFromHeader = (req: Request): string => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    return req.headers.authorization.split(' ')[1]
  }
  return ""
}

const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction  
) => {
  return jwt.verify(getTokenFromHeader(req),
    TOKEN_SECRET_KEY,
    function(err: any, decoded: any) {
      if (err !== null) {
        return error(res, "", "Invalid token", 401)
      }
      req.user = decoded
      next()
  })
}

export { checkJwt }