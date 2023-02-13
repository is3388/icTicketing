import { Subjects } from './subjects'

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: { 
    id: string; // for payment service
    version: number;
    ticket: {
      id: string; // for ticket service to unreserve the ticket
      price: number;
    }
  }
}