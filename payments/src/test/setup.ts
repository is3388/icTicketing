//import { request } from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

/*declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
    }
  }
}*/
declare global {
  //var signin: () => Promise<string[]>; // resolve with an array of cookies
  var signin: (id?: string) => string[];
}

jest.mock('../nats-wrapper') // fake implementation of NATS client
jest.mock('../stripe') // fake implementation of stripe, delete it if you want to use real stripe API to test
// process.env.STRIPE_KEY = 'your stripe secret key' if you want to use real stripe API to test
// also rename payments/src/__mocks__/stripe.ts to stripe.ts.old

// create an instance of mongo in memory server allow us to run multiple test suites at the same time across 
// different sub projects/services without trying to reach out to the same copy of Mongo 
// function hooks beforeAll() and afterAll()
let mongo: MongoMemoryServer
beforeAll(async () => {
  /* for newer version 8 not 6 mongomemoryserver 
  const mongo = await MongoMemoryServer().create()
  const mongoUri = await mongo.getUri()
   */
  process.env.JWT_KEY = 'adsf'
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {})
})
beforeEach (async () => {
  jest.clearAllMocks()
  const collections = await mongoose.connection.db.collections()
  for ( let collection of collections ) {
    await collection.deleteMany({})
  }
})

/* for newer version 8 use this 
afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
}) */
/* afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
}); */
afterAll( async () => { // switch the order for older version
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = (id?: string) => {
  // build a JWT payload {id, email}
  // if id is provided as argument, use that id instead of generate a new one
  const payload = { id: id || new mongoose.Types.ObjectId().toHexString(),
                    email: 'test@test.com'
                  }

  // create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!)

  // build session object { jwt: MY_JWT}
    const session = { jwt: token }

  // turn that session into JSON
    const sessionJSON = JSON.stringify(session)

  // take JSON and encode it as base64 in node
    const base64 = Buffer.from(sessionJSON).toString('base64')

  // return a string that the cookie with the encoded data
  //  return [`session=${base64}`] 
    return [`session=${base64}`] 
}
