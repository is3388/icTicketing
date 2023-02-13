import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface UserPayload {
  id: string;
  email: string;
}
// modify the existing interface inside Express project and add a property currentUser to it
// currentUser might or might not define depending on log in or not
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
     }
    }
}

export const currentUser = ( req: Request, res: Response, next: NextFunction ) => {
  if (!req.session?.jwt) {
    return next() // move on to next middleware which handle reject request if not logged in  
  }
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as UserPayload
    req.currentUser = payload // either with id and email or undefined
   }
   catch (err) { // no matter error on try block, move on to the next middleware to handle reject request
   }
  next()
}