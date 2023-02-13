import mongoose from "mongoose";
// to show the order is successfully paid 
interface PaymentAttrs {
  orderId: string;
  stripeId: string;
}

interface PaymentDoc extends mongoose.Document {
  orderId: string;
  stripeId: string;
  // version: number; if the payment can change due to order update or something
}

interface PaymentModel extends mongoose.Model<PaymentDoc> {
  build(attrs: PaymentAttrs): PaymentDoc
}

const paymentSchema =  new mongoose.Schema({
  orderId: { 
    type: String,
    required: true
  },
  stripeId: {
    type: String,
    required: true
  }
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id,
      delete ret._id
    }
  }
})

paymentSchema.statics.build = (attrs: PaymentAttrs) => {
  return new Payment(attrs)
}

const Payment = mongoose.model<PaymentDoc, PaymentModel>('Payment', paymentSchema)

export default Payment