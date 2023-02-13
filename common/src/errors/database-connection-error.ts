// Error is the built-in class
import { CustomError } from "./custom-error"
//export class DatabaseConnectionError extends Error {
  export class DatabaseConnectionError extends CustomError {
  reason = 'Error connecting to database'
  statusCode = 500
    constructor() {
    super('Error connecting to database')
    // this code is only use in typescript when extending a built-in class
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype)
  }
  // define a function to return the common structure of errors[] object
  serializeErrors() {
    return [{message: this.reason}]
  }
}