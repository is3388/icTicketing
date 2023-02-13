import nats from 'node-nats-streaming' 
import { TicketCreatedPublisher } from './events/ticket-created-publisher'

console.clear()
// first arg is cluster id in depl file, second is client name
const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222' // client of all services (either publisher or listener) can reach out to NATS SS (custom event bus) via port 4222 port stated in nats-depl file
})

// emit an event after client successfully connects to NATS streaming server
stan.on('connect', async () => {
  console.log('Publisher connected to NATS streaming server')
  // data is ticket that client wants to send to NATS streaming server but must be in JSON format
  /*const data = JSON.stringify({
    id: '123',
    title: 'Concert',
    price: 100
  }) 
  // first arg is subject, third arg is callback function
  stan.publish('ticket:created', data, () => {
    console.log('Event published')
  })*/
  const publisher = new TicketCreatedPublisher(stan)
  try {
    await publisher.publish({
    id: '123',
    title: 'concert',
    price: 30
    })
  }
catch(err) {
  console.error(err)
}
  
})