import { Listener, OrderCreatedEvent, Subjects } from '@icticketing/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import Ticket from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticket-updated-publisher'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
  queueGroupName = queueGroupName
  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
  // find the ticket that the order is reserving
  const ticket = await Ticket.findById(data.ticket.id)
  // if not found, throw an error
  if (!ticket) {
    throw new Error('Ticket not found')
  }
  // mark the ticket is reserved by setting the orderId property
  //ticket.orderId = data.id
  ticket.set({orderId: data.id})
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


