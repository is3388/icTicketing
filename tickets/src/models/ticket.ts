import mongoose from 'mongoose'
import { updateIfCurrentPlugin } from 'mongoose-update-if-current' // versioning

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}


interface TicketModel extends mongoose.Model<TicketDoc>{
  build(attrs: TicketAttrs) : TicketDoc;
}


interface TicketDoc extends mongoose.Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string; // optional because when a ticket created, there is no order yet
}

const ticketSchema = new mongoose.Schema<TicketDoc>({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  orderId: {
    type: String
  }
}, 
  {
    toJSON: { // toJSON method where doc is the ticket instance (TicketDoc) and ret is what returns from it
      transform(doc, ret)
        {
          ret.id = ret._id // remap _id to id
          delete ret._id // delete _id property from the object
        }
      },
    timestamps: true
  }
)

ticketSchema.set('versionKey', 'version') // rename
ticketSchema.plugin(updateIfCurrentPlugin)
// custom function build into model
ticketSchema.statics.build = (attrs: TicketAttrs) => {
  return new Ticket(attrs)
}

const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema)

export default Ticket
//export { Ticket, buildTicket}