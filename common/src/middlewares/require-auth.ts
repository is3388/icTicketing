import { Request, Response, NextFunction } from 'express'
import { NotAuthorizedError } from '../errors/not-authorized-error'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) { // user is not logged in
    throw new NotAuthorizedError()
  }
  next()
}