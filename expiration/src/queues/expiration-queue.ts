import Queue from "bull";
import { ExpirationCompletedPublisher } from "../events/publishers/expiration-completed-publisher";
import { natsWrapper } from "../nats-wrapper";

// queue is like jobs or messages queue up and process later
// create an instance of a queue to publish and process the job 
// pass it over to redis running on pod to store temporarily
// first arg is the channel, the 'order:expiration' stores temp on redis
// after 15 minutes elapsed, pass it back to expiration queue to process 
// which is to publish order:expiration event to Orders Service
// second arg is options object to conncet to redis

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration', {
  redis: {
    host: process.env.REDIS_HOST
  }
})

expirationQueue.process( async (job) => {
  //console.log('I want to publish an expiration:complete', job.data.orderId)
  new ExpirationCompletedPublisher(natsWrapper.client).publish({
    orderId: job.data.orderId
  })
})

export default expirationQueue//export { expirationQueue }