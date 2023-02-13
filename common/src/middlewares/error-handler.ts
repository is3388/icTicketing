import { Request, Response, NextFunction } from 'express'
//import { RequestValidationError } from '../errors/request-validation-error'
//import { DatabaseConnectionError } from '../errors/database-connection-error'
import { CustomError } from '../errors/custom-error'

export const errorHandler = (
  err: Error,
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  //console.log('Something went wrong')
  //if ( err instanceof RequestValidationError ) {
    // err.errors errors from the property of RequestValidationError which is an array 
    // we want to structure every error like that error.msg and error.param from ValidationError of express-validator
    // that contains param, value, msg, location
    //const formattedErrors = err.errors.map(error => {
    //  return { message: error.msg,
    //           field: error.param
    //          }
    //})
    // we want to structure an array of errors into errors object like {errors: {message: string, field?: string}[]}
    if ( err instanceof CustomError ) {  
    return res.status(err.statusCode).send({errors: err.serializeErrors()})
  }
  console.error(err)

 // if ( err instanceof DatabaseConnectionError ) {
    // same structure of errors err.reason from database-connection-error property
  // return res.status(err.statusCode).send({errors: err.serializeErrors()})
 // }

  // generic error message 
  res.status(400).send({errors: [{message: 'Something went wrong'}]})
}

