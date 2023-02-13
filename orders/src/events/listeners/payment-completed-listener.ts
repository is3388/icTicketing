import { Listener, Subjects, OrderStatus, PaymentCompletedEvent } from '@icticketing/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queue-group-name'
import Order from '../../models/order'

export class PaymentCompletedListener extends Listener<PaymentCompletedEvent> {
  readonly subject = Subjects.PaymentCompleted
  queueGroupName = queueGroupName

  async onMessage(data: PaymentCompletedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId)
    if(!order) {
      throw new Error('Order not found')
    }
    order.set({status: OrderStatus.Completed}) // if our app allows order can be updated, emit order:updated event to other services like tickets 
    // so that there won't be a missing version update when the order is save at this point. 
    await order.save()
    msg.ack()
  }
}
