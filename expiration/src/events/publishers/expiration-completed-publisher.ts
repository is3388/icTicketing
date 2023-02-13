import { Subjects, Publisher, ExpirationCompletedEvent }from '@icticketing/common'

export class ExpirationCompletedPublisher extends Publisher<ExpirationCompletedEvent> {
  readonly subject = Subjects.ExpirationCompleted
}