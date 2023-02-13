
import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'

const connectDB = async () => {
  
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

    new OrderCreatedListener(natsWrapper.client).listen()
  }
  catch(err) {
    console.error(err)
  }
  }

connectDB()