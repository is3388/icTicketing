import { Listener, OrderCancelledEvent, Subjects } from '@icticketing/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import Ticket from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
  queueGroupName = queueGroupName
  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
  // find the ticket that the order is reserving
  const ticket = await Ticket.findById(data.ticket.id)
  // if not found, throw an error
  if (!ticket) {
    throw new Error('Ticket not found')
  }
  // mark the ticket is no logner reserved by setting the orderId property
  
  ticket.set({orderId: undefined}) // not null bc optional value doesn't work well with null
  // save the ticket
  await ticket.save()
  // publish the ticket updated event
  await new TicketUpdatedPublisher(this.client).publish({
    id: ticket.id,
    price: ticket.price,
    title: ticket.title,
    userId: ticket.userId,
    orderId: ticket.orderId,
    version: ticket.version
  })
  // ack the message
  msg.ack()
  }
}


