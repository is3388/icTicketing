import { Subjects } from './subjects'
import { OrderStatus } from './types/order-status';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: { 
    id: string; // expiration service needs to know
    version: number;
    status: OrderStatus;
    userId: string; // payment service needs to know who should make payment
    expiresAt: string; // expireation service needs to know (turn Date object into Order model converted all data into JSONstring)
    ticket: {
      id: string; // ticket service needs to know for reserve and prevent editing
      price: number; // payment service needs to know
    }
  }
}