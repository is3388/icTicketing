import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketCreatedEvent } from '@icticketing/common'
import Ticket from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject= Subjects.TicketCreated
  queueGroupName = queueGroupName
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) { // msg is call ack when successfully receive the msg from NATSS to client 
    const { id, title, price } = data
    const ticket = Ticket.build({
      id,
      title,
      price
    })
    await ticket.save()
    msg.ack()
  }
}