import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

// scrypt is a function to use for hashing but it is callback based
// we use promisify to turn the scrypt into promise based which is equivalent to async await
// const scryptAsync: Promise<Buffer> = promisify(scrypt) then no need to do as Buffer below
const scryptAsync = promisify(scrypt)
export class Password {
  // static method is we can access it without creating an instance of a class
  // Password.toHash()
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex')
    const buf = (await scryptAsync(password, salt, 64)) as Buffer // tell TS buf is Buffer type
    
    return `${buf.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    // stored password is hash and salt concat with a dot
    const [hashedPassword, salt] = storedPassword.split('.')
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer 
    return buf.toString('hex') === hashedPassword
  }

}