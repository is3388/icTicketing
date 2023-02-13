/* all /* comment code move to app.ts import express from 'express'
import { json } from 'body-parser'
import 'express-async-errors'*/
import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
// import cookie-session to wire up Express app as a middleware
/*import cookieSession from 'cookie-session'*/
import { TicketCreatedListener } from './events/listeners/ticket-created-listener'
import { TicketUpdatedListener } from './events/listeners/ticket-updated-listener'
import { ExpirationCompletedListener } from './events/listeners/expiration-completed-listener'
import { PaymentCompletedListener } from './events/listeners/payment-completed-listener'

const connectDB = async () => {
  if (!process.env.JWT_KEY) {// env var for secret key
    throw new Error('JWT_KEY must be defined')
  }
  if (!process.env.MONGO_URI) {// env var for mongodb for tickets
    throw new Error('MONGO_URI must be defined')
  }
  if (!process.env.NATS_CLUSTER_ID) {// env var for NATS SS cluster for tickets
    throw new Error('NATS_CLUSTER_ID must be defined')
  }
  if (!process.env.NATS_CLIENT_ID) {// env var for the clients that connect to NATS SS for tickets
    throw new Error('NATS_CLIENT_ID must be defined')
  }
    if (!process.env.NATS_URL) {// env var for  NATS SS url for tickets
    throw new Error('NATS_URL must be defined')
  }
  
  try { 
    // first arg is cluster id defined in nats-depl file, second arg is client id must be unique, third is url
    await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.NATS_URL)
    // connect the auth to mongoDB instance via auth-mongo-srv the service of the pod running mongodb 
    // default mongodb port listen to traffic is 27017 and tickets is the name of database
    //await mongoose.connect('mongodb://tickets-mongo-srv:27017/tickets', {})
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!')
      process.exit()
    })
    
    process.on('SIGINT', () => natsWrapper.client.close())
    process.on('SIGTERM', () => natsWrapper.client.close())

    new TicketCreatedListener(natsWrapper.client).listen()
    new TicketUpdatedListener(natsWrapper.client).listen()
    new ExpirationCompletedListener(natsWrapper.client).listen()
    new PaymentCompletedListener(natsWrapper.client).listen()

    await mongoose.connect(process.env.MONGO_URI, {})
    console.log('Connected to MongoDB')
  }
  catch(err) {
    console.error(err)
  }
}

app.listen(4000, () => {
  console.log('Listening on port 4000!!!')
})

connectDB()