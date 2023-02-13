import { Subjects, Publisher, PaymentCompletedEvent } from '@icticketing/common'

export class PaymentCompletedPublisher extends Publisher<PaymentCompletedEvent> {
  readonly subject = Subjects.PaymentCompleted
}