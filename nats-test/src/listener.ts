import nats from 'node-nats-streaming' // Message is an interface with functions getData, getSequence, getSubject
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './events/ticket-created-listener'

console.clear() // clear out lots of info in terminal if you run npm run publish
// first arg is cluster name, second is client id
// create a client which is node-nats-streaming the one who serves as client of Listener or publisher to connect to NATS streaming server
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222' // client of all services (either publisher or listener) can reach out to NATS SS (custom event bus) via port 4222 port stated in nats-depl file
})

// emit an event after client successfully connects to NATS streaming server
stan.on('connect', () => {
  console.log('Listener connected to NATS streaming server')


// set up event handler anytime we close this client/disconnect this client from NAT SS
stan.on('close', () => {
  console.log('NATS connection closed!')
  process.exit() // end process
}) 

// specific listener for specific event
new TicketCreatedListener(stan).listen()

})


// 2 handlers to close the client connection before doing terminate signals or interrupt signals
// that prevents order of events out of sync as NATS SS not know the client is offline and resend event after 30 secs to part of queue group
process.on('SIGINT', () => stan.close()) 
process.on('SIGTERM', () => stan.close())

// first arg is channel that NATS listens to and second arg is name of the queue group which is inside channel 
// to make sure only emit event to only one instance of the service subscribes (as order service might have multiple instances)  
// third arg is options 
// override the default behavior of listener to send ack when receiving events regardless
// setDeliverAllAvailable is needed for sending missed events once time to the listener which just backup to online 
//const options = stan.subscriptionOptions()
//  .setManualAckMode(true)
//  .setDeliverAllAvailable() // ignore when restart listener only for first time
//  .setDurableName('ordering-service') // name of identifier for this subscription that NATS SS has record to keep track of and must have queue group added to prevent NATSS redeliver the events
// only send acknowledgment after finishing process
// NATS wait for 30 sec if not getting ack of the event received from listener, NATS will resend event to that subscriber or part of queue group memeber
/*const subscription = stan.subscribe('ticket:created', 'orders-service-queue-group', options) 
  // listen to event
  subscription.on('message', (msg: Message) => {
    console.log('Message received')
    const data = msg.getData()
    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }
    msg.ack() // acknowledge of getting the event from NATS
  }) */





