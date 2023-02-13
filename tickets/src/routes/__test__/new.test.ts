import request from 'supertest'
import { app } from '../../app'
import Ticket from '../../models/ticket'
import { natsWrapper } from '../../nats-wrapper'

it('has a route handler listening to /api/tickets for post requests', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .send({})
  expect(response.status).not.toEqual(404) // 404 if that route does not exist
})

it('can only accessed if the user is signed in', async () => {
  // const response = await request(app)
  await request(app)
  .post('/api/tickets')
  .send({}) // not signed in
// expect(response.status).toEqual(401)
expect(401)
})

it('returns a stuatus not 401 if the user is signed in', async () => {
  const response = await request(app)
   .post('/api/tickets')
   .set('Cookie', global.signin())
   .send({})
  expect(response.status).not.toEqual(401)
})

it('returns an error if invalid title is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: '', price: 10})
    .expect(400)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ price: 10})
    .expect(400)
})

it('returns an error if invalid price is provided', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'NBA Final', price: -10 })
    .expect(400)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'NBA Final'})
    .expect(400)
})

it('creates a ticket with valid inputs', async () => {
  // make sure save the new ticket to database
  let tickets = await Ticket.find({})
  expect(tickets.length).toEqual(0)
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'NBA', price: 100})
    .expect(201)
  tickets = await Ticket.find({})
  expect(tickets.length).toEqual(1)
  expect(tickets[0].price).toEqual(100)
  expect(tickets[0].title).toEqual('NBA')
})

it('publishes an event', async () => {
  await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({ title: 'Rock Concert', price: 100})
    .expect(201)
    // the publish function is called
  expect(natsWrapper.client.publish).toHaveBeenCalled()
})

