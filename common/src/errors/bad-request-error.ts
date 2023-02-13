import { CustomError } from "./custom-error"
// to handle all generic error from request inputs
export class BadRequestError extends CustomError {
    statusCode = 400
    constructor(public message: string) {
    super(message) // super call first and then back to create an instance
    // this code is only use in typescript when extending a built-in class
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }
  // define a function to return the common structure of errors[] object
  serializeErrors() {
    return [{message: this.message}]
  }
}