import { OrderCancelledListener } from "../order-cancelled-listener"
import { natsWrapper } from "../../../nats-wrapper"
import Ticket from "../../../models/ticket"
import { OrderCancelledEvent, OrderStatus } from "@icticketing/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"

const setup = async () => {
  // create an instance of listener
  const listener = new OrderCancelledListener(natsWrapper.client) // mock

  const orderId = new mongoose.Types.ObjectId().toHexString()
  // create and save a ticket (assume the ticket already has order Id)
  const ticket = Ticket.build({
    title: 'concert',
    price: 20,
    userId: 'abc'
    })
    ticket.set({orderId})
  await ticket.save()

  // create the fake data event with data object and msg object
  const data: OrderCancelledEvent['data'] = {
    id: orderId,
    version: 0,
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
// condense into one test
it('updates the ticket, publishes an event and acks the message', async () => {
  const { listener, data, ticket, msg } = await setup()
  await listener.onMessage(data, msg )
  const updatedTicket = await Ticket.findById(ticket.id) // refetch the ticket because out of sync
  expect(updatedTicket!.orderId).not.toBeDefined() // data.id is order.id
  expect(msg.ack).toHaveBeenCalled()
  expect(natsWrapper.client.publish).toHaveBeenCalled()
})



