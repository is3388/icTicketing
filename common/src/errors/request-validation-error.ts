import { ValidationError } from 'express-validator' // get the error type contains param, value, msg, location
import { CustomError } from "./custom-error"
// Error is the built-in class
//export class RequestValidationError extends Error {
  export class RequestValidationError extends CustomError {
  statusCode = 400
  // same as errors: ValidationError[]
  // constructor(errors: ValidationError[]) {
  //   this.errors = errors
  //}
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters')
    // this code is only use in typescript when extending a built-in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
  serializeErrors() {
    return this.errors.map(error => {
      return { message: error.msg,
               field: error.param
              }
    })
  }
}