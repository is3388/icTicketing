import mongoose from 'mongoose';
import { OrderStatus } from '@icticketing/common';
import { TicketDoc } from './ticket'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// re export this file
export { OrderStatus }

// <OrderrDoc> is generic syntax in TS which means OrderDoc is an interface
// an interface to describe the properties required to create a new order
// this is used for Typescript checking
interface OrderAttrs {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
}

// an interface describes what the entire Order collection looks like
// take the existing mongoose.Model interface and add the buid function
interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

// an interface describes what properties a single order has in Order Document
interface OrderDoc extends mongoose.Document {
  userId: string;
  status: OrderStatus;
  expiresAt: Date;
  ticket: TicketDoc;
  version: number;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true, // cancel or await payment or purchased or paid
      enum: Object.values(OrderStatus), // mongoose makes sure the value is one of the OrderStatus
      default: OrderStatus.Created,
    },
    expiresAt: {
      type: mongoose.Schema.Types.Date,
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        },
    },
  }
);
orderSchema.set('versionKey', 'version')
orderSchema.plugin(updateIfCurrentPlugin)
orderSchema.statics.build = (attrs: OrderAttrs) => {
  return new Order(attrs);
};
const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export default Order; // export { Order }
