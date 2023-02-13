import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@icticketing/common';
import Order from '../models/order';
import { stripe } from '../stripe';
import Payment from '../models/payment';
import { PaymentCompletedPublisher } from '../events/publishers/payment-completed-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty().withMessage('Token is required'),
    body('orderId').not().isEmpty().withMessage('OrderId is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.price * 100, // in cents
      source: token, // source of the money can be id of credit/debit card, bank account
      // response.dat gets back includes id: 'a string' , object: 'charge'
    });

    // create an instance of payment object to keep track of the order has been paid inside payment collection within Payment Service
    const payment = Payment.build({
      orderId: orderId,
      stripeId: charge.id,
    });
    await payment.save();

    // publish payment:completed event
    new PaymentCompletedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export default router; // export { router as createChargeRouter}
