import { NotAuthorizedError, NotFoundError, requireAuth } from '@icticketing/common'
import express, { Request, Response } from 'express'
import Order, { OrderStatus } from '../models/order'
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

// only mark the order status as cancelled not delete it inside the database
router.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket')
  if (!order) {
    throw new NotFoundError()
  }
  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError()
  }
  //order.delete()
  order.status = OrderStatus.Cancelled
  await order.save()

  // publish an event the order is cancelled
  new OrderCancelledPublisher(natsWrapper.client).publish({
    id: order.id,
    version: order.version,
    ticket: {
      id: order.ticket.id,
      price: order.ticket.price
    }
  })
  res.status(204).send(order)
})

export default router
// export { router as deleteOrderRouter }