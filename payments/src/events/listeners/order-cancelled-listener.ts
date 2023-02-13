import { Listener, Subjects, OrderCancelledEvent, OrderStatus } from '@icticketing/common'
import { queueGroupName } from './queue-group-name'
import Order from '../../models/order'
import { Message } from 'node-nats-streaming'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
  queueGroupName = queueGroupName

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    // look for the order in order collection within payments service
    const order = await Order.findOne({
      _id: data.id,
      version: data.version - 1
    })
    if (!order) {
      throw new Error('Order not found')
    }
    order.set({
      status: OrderStatus.Cancelled
    })
    await order.save()
    msg.ack()
  }
}