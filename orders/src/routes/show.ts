import { NotAuthorizedError, NotFoundError, requireAuth } from '@icticketing/common'
import express, { Request, Response } from 'express'
import Order from '../models/order'

const router = express.Router()

router.get('/api/orders/:orderIid', requireAuth, async (req: Request, res: Response) => {
 const order = await Order.findById(req.params.orderIid).populate('ticket') // also retrieve the ticket associated with the order
 if (!order) {
  throw new NotFoundError()
 }
 if (order.userId !== req.currentUser!.id) {
  throw new NotAuthorizedError()
 }
 res.send(order)
})

export default router
// export { router as showOrderRouter }