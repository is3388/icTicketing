import { TicketUpdatedListener } from "../ticket-updated-listener"
import { natsWrapper } from "../../../nats-wrapper"
import { TicketUpdatedEvent } from "@icticketing/common"
import mongoose from "mongoose"
import { Message } from "node-nats-streaming"
import Ticket from "../../../models/ticket"

const setup = async () => {
// create an instance of the listener
const listener = new TicketUpdatedListener(natsWrapper.client)

// create and save a ticket
const ticket = Ticket.build({
  id: new mongoose.Types.ObjectId().toHexString(),
  title: 'concert',
  price: 20
})
await ticket.save()

// create a fake data updated event
const data: TicketUpdatedEvent['data'] = {
  version: ticket.version + 1,
  id: ticket.id,
  title: 'new concert',
  price: 99,
  userId: 'abc'

 }
// create a fake message object
// @ts-ignore
const msg: Message = {
  ack: jest.fn() // to return number of times the ack() is called
  }
  return { ticket, data, listener, msg }
}

it('finds, updates and saves a ticket', async () => {
  const { ticket, listener, data, msg } = await setup()

// call the onMessage function with data object and message objectm
await listener.onMessage(data, msg)

// write assertions to make sure a ticket is created
const updatedTicket = await Ticket.findById(ticket.id)
expect(updatedTicket!.title).toEqual(data.title)
expect(updatedTicket!.price).toEqual(data.price)
expect(updatedTicket!.version).toEqual(data.version)

})

it('acks the message', async () => {
  const { listener, data, msg } = await setup()

// call the onMessage function with data object and message object
  await listener.onMessage(data, msg)

// write assertions to make sure ack is called
  expect(msg.ack).toHaveBeenCalled()
})

it('does not call ack if the event has a skipped version number', async () => {
  const { msg, data, listener, ticket } = await setup()
  data.version = 10
  try {
  await listener.onMessage(data, msg)
  }
  catch(err) {

  }
  expect(msg.ack).not.toHaveBeenCalled() 
})

it('does not call ack on wrong event version', async () => {
  const { listener, data, msg, ticket } = await setup();
  data.version = 100;
  await expect(listener.onMessage(data, msg)).rejects.toThrow();
 
  expect(msg.ack).not.toHaveBeenCalled();
});
