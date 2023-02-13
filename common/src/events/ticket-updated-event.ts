import { Subjects } from './subjects'

export interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: { 
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
    orderId?: string; // optional bc when ticket is created, there is no order yet
  }
}