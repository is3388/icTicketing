import { Publisher, Subjects, TicketCreatedEvent } from '@icticketing/common'
// create this publisher with specific event
export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}