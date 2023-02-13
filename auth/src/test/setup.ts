//import { request } from 'express'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

/*declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>
    }
  }
}*/
declare global {
  var signin: () => Promise<string[]>; // resolve with an array of cookies
}
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
  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {})
})
beforeEach (async () => {
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
afterAll( async () => { // switch the order for older version
  await mongo.stop()
  await mongoose.connection.close()
})

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';
  const response = await request(app)
    .post('/api/users/signup')
    .send({email, password})
    .expect(201)
  const cookie = response.get('Set-Cookie')
  return cookie
}
