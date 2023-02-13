import { Stan } from 'node-nats-streaming'
import { Subjects } from './subjects'

interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Publisher<T extends Event> {
  abstract subject: T['subject']
  private client: Stan

  constructor(client: Stan) {
    this.client = client
  }
 // publish event to NATS SS is an async operation
 // want to wait for the event published before doing something else in our code
 // this function returns a Promise
  publish(data: T['data']): Promise<void> { 
    return new Promise ((resolve, reject) => {
      // channel and data to be published
    this.client.publish(this.subject, JSON.stringify(data), (err) => {
      //console.log('Event published!')
      if (err) {
        return reject(err)
      }
      console.log('Event published to subject', this.subject)
      resolve()
    }
    )
    
    })
    
  }
}
