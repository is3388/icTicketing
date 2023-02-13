import { Publisher, Subjects, TicketUpdatedEvent } from '@icticketing/common'
// create this publisher with specific event
export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}