export enum OrderStatus {
  // When the order has been created but the ticket has not been reserved
  Created = 'created',
  // The ticket the order is trying to reserve has been reserved, 
  // or when the user has cancelled the order
  // if the order expires before payment
  Cancelled = 'cancelled',
  // The order has been successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment',
  // The order has reserved the ticket
  // and the user has provided payment successfully
  Completed = 'completed'
}