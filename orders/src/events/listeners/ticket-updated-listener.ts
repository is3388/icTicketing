import { Message } from "node-nats-streaming";
import { Subjects, Listener, TicketUpdatedEvent } from '@icticketing/common'
import Ticket from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject= Subjects.TicketUpdated
  queueGroupName = queueGroupName
  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) { // msg is call ack when successfully receive the msg from NATSS to client 
    
    const ticket = await Ticket.findOne({_id: data.id, version: data.version - 1})
    if (!ticket) {
      throw new Error ('Ticket not found')
    }
    const { title, price } = data
    ticket.set({title, price})
    await ticket.save()
    msg.ack()
  }
}