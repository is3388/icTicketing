export abstract class CustomError extends Error {
  // list of properties that subclass must be implemented
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // after colon is return an object contains two properties
  abstract serializeErrors(): { message: string;
                                field?: string;}[]
}