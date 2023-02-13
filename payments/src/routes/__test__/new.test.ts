import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import Order from '../../models/order'
import Payment from '../../models/payment'
import { OrderStatus } from '@icticketing/common'
import { stripe } from '../../stripe'

jest.mock('../../stripe') // delete this code if you use the real stripe API to test

it('returns a 404 when purchasing an order does not exist', async () => {
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'abc',
      orderId: new mongoose.Types.ObjectId().toHexString()
    })
    .expect(404)
})

it('returns a 401 when purchasing an order does not belong to the user', async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created
  })
  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin())
    .send({
      token: 'abc',
      orderId: order.id
    })
    .expect(401)
})

it('returns a 400 when purchasing an cancelled order', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Cancelled
  })
  await order.save()

  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: 'abc',
      orderId: order.id
    })
    .expect(400)
})

it('returns a 204 with valid inputs', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created
  })
  await order.save()
// payment created
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: 'tok_visa',
      orderId: order.id
    })
    .expect(201)
    // look at the first time gets called and the first argument
  const charbgeOptions = (stripe.charges.create as jest.Mock).mock.calls[0][0]
  const chargeResult = await (stripe.charges.create as jest.Mock).mock
    .results[0].value
  expect(charbgeOptions.source).toEqual('tok_visa')
  expect(charbgeOptions.amount).toEqual(20 * 100)
  expect(charbgeOptions.currency).toEqual('usd')

  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: chargeResult.id,
  });
 
  expect(payment).toBeDefined();
  expect(payment!.orderId).toEqual(order.id);
  expect(payment!.stripeId).toEqual(chargeResult.id);
})

// use real stripe API to test
/*it('returns a 204 with valid inputs', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()
  const price = Math.floor(Math.random() * 100000) 
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: price,
    status: OrderStatus.Created
  })
  await order.save()
// payment created
  await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: 'tok_visa',
      orderId: order.id
    })
    .expect(201)
  const stripeCharges = await stripe.charges.list({ limit: 50 }) 
  const stripeCharge = stripeCharges.data.find( charge => {
    return charge.amount === price * 100
  })
  expect(stripeCharge).toBeDefined()   // make sure not undefined create a charge with the correct amount
  expect(stripeCharge!.currency).toEqual('usd')
  expect(stripeCharge!.token).toEqual('tok_visa')
  const payment = await Payment.findOne({
    orderId: order.id,
    stripeId: stripeCharge!.id
  })
  expect(payment).not.toBeNull()
  expect(payment!.orderId).toEqual(order.id)
  expect(payment!.stripeId).toEqual(chargeResult.id)

}) */

// use real stripe API to test but not use random generated number for price
/*('returns a 204 with valid inputs', async () => {
  const userId = new mongoose.Types.ObjectId().toHexString()
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: userId,
    version: 0,
    price: 20,
    status: OrderStatus.Created
  })
  await order.save()
// payment created
  const response = await request(app)
    .post('/api/payments')
    .set('Cookie', global.signin(userId))
    .send({
      token: 'tok_visa',
      orderId: order.id
    })
    .expect(201)
   
  const chargeId = response.body.charge.id;
  expect(chargeId).toBeDefined();

  const createdCharge = await stripe.charges.retrieve(chargeId);
  expect(createdCharge).toBeDefined();
  expect(createdCharge.amount).toEqual(order.price * 100);
}) */
