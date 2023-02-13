import { OrderCreatedListener } from "../order-created-listener"
import { natsWrapper } from "../../../nats-wrapper"
import Ticket from "../../../models/ticket"
import { OrderCreatedEvent, OrderStatus } from "@icticketing/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"

const setup = async () => {
  // create an instance of listener
  const listener = new OrderCreatedListener(natsWrapper.client) // mock

  // create and save a ticket
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'abc'
  })
  await ticket.save()

  // create the fake data event with data object and msg object
  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'abc',
    expiresAt: 'bbc',
    ticket: {
        id: ticket.id,
        price: ticket.price
    }
  }
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }
  // or  use special TS utils const msg: Pick<Message, 'ack'> = {
  //  ack: jest.fn(),
  //};
  return { listener, data, ticket, msg }
}

it('sets the userId of the ticket', async () => {
  const { listener, data, ticket, msg } = await setup()
  await listener.onMessage(data, msg )
  const updatedTicket = await Ticket.findById(ticket.id) // refetch the ticket because out of sync
  expect(updatedTicket!.orderId).toEqual(data.id) // data.id is order.id
})

it('acks the message', async () => {
  const { listener, data, ticket, msg } = await setup()
  await listener.onMessage(data, msg )
  expect(msg.ack).toHaveBeenCalled()

})

it('publishes a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup()
  await listener.onMessage(data, msg)
  expect(natsWrapper.client.publish).toHaveBeenCalled()
  
  const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
  // return name of event and JSON object with version,ticket id, price,orderId, userId, title and the callback fn
  expect(data.id).toEqual(ticketUpdatedData.orderId)

})