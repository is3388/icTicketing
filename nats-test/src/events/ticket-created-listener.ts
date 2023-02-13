// subclass of an abstract Listener class used for listening specific event which is ticket creation
import { Listener } from "./base-listener";
import { Message } from 'node-nats-streaming'
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  //subject = 'ticket:created';
  // readonly is like final
  readonly subject = Subjects.TicketCreated;
  queueGroupName = 'payments-service';
  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data', data)
    console.log(data.id)
    console.log(data.title)
    console.log(data.price)
    // business logic goes here. if fails, it will timeout
    msg.ack() // successfully parse
  }
}