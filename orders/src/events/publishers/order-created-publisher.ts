import { Publisher, Subjects, OrderCreatedEvent } from '@icticketing/common'
// create this publisher with specific event
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated
}