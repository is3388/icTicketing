import { ExpirationCompletedListener } from "../expiration-completed-listener";
import { natsWrapper } from "../../../nats-wrapper";
import Ticket from "../../../models/ticket";
import Order from "../../../models/order";
import mongoose from "mongoose";
import { OrderStatus, ExpirationCompletedEvent } from '@icticketing/common'
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new ExpirationCompletedListener(natsWrapper.client)
  
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })
  await ticket.save()
  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'abc',
    expiresAt: new Date(),
    ticket   
  })
  await order.save()

  // build fake data
const data: ExpirationCompletedEvent['data'] = {
  orderId: order.id
}

// build a fake message
// @ts-ignore
const msg: Message = {
  ack: jest.fn()
}
return { listener, order, ticket, data, msg }
}

it('updates the order status to cancelled', async () => {
  const { listener, order, data, msg } = await setup()
  await listener.onMessage(data, msg)
  const updatedOrder = await Order.findById(order.id)
  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emits an OrderCancelled event', async () => {
  const { listener, order, data, msg } = await setup()
  await listener.onMessage(data, msg)
  expect(natsWrapper.client.publish).toHaveBeenCalled()
  // let TS to understand this is a mock function, put as jes.Mock
  // then access number of times the function invoke and different args over time
  // publish should be invoked one time and [0][0] is subject the channel,
  // [0][1] returns data in JSON
  const eventData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1])
  expect(eventData.id).toEqual(order.id)
})

it('acks the message', async () => {
  const { data, msg, listener} = await setup()
  await listener.onMessage(data, msg) 
  expect(msg.ack).toHaveBeenCalled()
})


