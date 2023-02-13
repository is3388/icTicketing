// generic listener to listen on event
// abstract class used for derived class
import { Message, Stan } from 'node-nats-streaming'
import { Subjects } from './subjects';

// generic event
interface Event {
  subject: Subjects;
  data: any;
}
export abstract class Listener <T extends Event> {
  //abstract subject: string;
  abstract subject: T['subject']; // subject (channel) portion and data portion of the Event
  abstract queueGroupName: string;
  abstract onMessage(data: T['data'], msg: Message) : void
  private client: Stan;
  protected ackWait = 5 * 1000; // 5 millisecond 
  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client.subscriptionOptions()
      .setDeliverAllAvailable()
      .setManualAckMode(true)
      .setAckWait(this.ackWait)
      .setDurableName(this.queueGroupName)      
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    )
    subscription.on('message', (msg: Message) => {
      console.log(`Message received: ${this.subject} / ${this.queueGroupName}`) // channel 
      const parsedData = this.parseMessage(msg)
      this.onMessage(parsedData, msg)
    })
  }

  parseMessage(msg: Message) {
    const data = msg.getData() // either String or Buffer
    return typeof data === 'string'
    ? JSON.parse(data) // turn into JSON object
    : JSON.parse(data.toString('utf8')) // from Buffer to string and to JSON object
  }
}