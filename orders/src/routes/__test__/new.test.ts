import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import Order from '../../models/order'
import Ticket from '../../models/ticket'
import { OrderStatus } from '@icticketing/common'
import { natsWrapper } from '../../nats-wrapper' // jest redirect to nats-wrapper in __mock__ folder

const ticketId = new mongoose.Types.ObjectId().toHexString()
it('returns an error if the ticket does not exist', async () => {
  //const ticketId = new mongoose.Types.ObjectId()
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId})
    .expect(404)

})

it('returns an error if the ticket is already reserved', async () => {
  const ticket = Ticket.build({
    id: ticketId,
    title: 'Concert',
    price: 100
  })
  await ticket.save()
  const order = Order.build({
    ticket,
    userId: 'lasnkk',
    status: OrderStatus.Created,
    expiresAt: new Date()
  })
  await order.save()

  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(400)
})

it('reserve a ticket', async () => {
  const ticket = Ticket.build({
    id: ticketId,
    title: 'Concert',
    price: 30
  })
  await ticket.save()
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201)

})

it('emit an order created event', async () => {
  const ticket = Ticket.build({
    id: ticketId,
    title: 'Concert',
    price: 30
  })
  await ticket.save()
  await request(app)
    .post('/api/orders')
    .set('Cookie', global.signin())
    .send({ticketId: ticket.id})
    .expect(201)
expect(natsWrapper.client.publish).toHaveBeenCalled()
  
})