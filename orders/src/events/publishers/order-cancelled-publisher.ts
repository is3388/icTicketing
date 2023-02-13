import { Publisher, Subjects, OrderCancelledEvent } from '@icticketing/common'
// create this publisher with specific event
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}