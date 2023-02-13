import { requireAuth, validateRequest, NotFoundError, OrderStatus, BadRequestError } from '@icticketing/common'
import express, { Request, Response } from 'express'
import mongoose from 'mongoose'
import { body } from 'express-validator'
import Ticket from '../models/ticket'
import Order from '../models/order'
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

// alternative put this as env variable inside orders-depl.yaml 
const EXPIRATION_WINDOW_SECONDS = 15 * 60 // order expires in 15 second * 60 = 15 minutes
router.post('/api/orders', requireAuth, 
[
  body('ticketId')
  .not()
  .isEmpty()
  .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
  .withMessage('TicketId must be provided'),
  //body("ticketId").isMongoId().withMessage('Invalid ticketId')
 ], validateRequest,
async (req: Request, res: Response) => {
  const { ticketId } = req.body
  // create an order that associated ticket already created inside DB
  // make sure order will expire after 15 sec or min
  // find the ticket
  const ticket = await Ticket.findById(ticketId)
  if (!ticket) {
    throw new NotFoundError()
  }
  // make sure the ticket is not reserved - must have associated order and the order status must not cancelled
  const isReserved = await ticket.isReserved()
  if (isReserved) {
    throw new BadRequestError('Ticket is already reserved')
  }
  // calculate the expiration date of the order - 15 sec or 15 min
  const expiration = new Date() // JS Data object
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS)

  // build the order and save to DB
  const order = Order.build({
    userId: req.currentUser!.id, // requireAuth already authenticate user
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket: ticket
  })
  await order.save()

  // publish event the order has created
  new OrderCreatedPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    status: OrderStatus.Created,
    userId: order.userId,
    expiresAt: order.expiresAt.toISOString(), // return a string in UTC format (share timestamp across different services) not Date object 
    ticket: {
      id: ticket.id,
      price: ticket.price
    }
  })

  res.status(201).send(order)
})

export default router
// export { router as newOrderRouter }