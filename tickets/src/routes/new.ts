import express, { Request, Response } from 'express'
import {body} from 'express-validator'
import { requireAuth, validateRequest } from '@icticketing/common'
import Ticket from '../models/ticket'
import { TicketCreatedPublisher } from '../events/publishers/ticket-created-publisher'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()
// create new ticket and update ticket, user must be authenticated
router.post('/api/tickets', requireAuth, 
[ body('title').not().isEmpty().withMessage('Title is required'),
  body('price').isFloat({gt: 0}).withMessage('Price must be greater than 0')
], validateRequest,
 async (req: Request, res: Response) => {
   const {title, price} = req.body
   const ticket = Ticket.build({
    title,
    price,
    userId: req.currentUser!.id
  })
  await ticket.save()
  // after new ticket is saved to db, publish that event to event bus
  await new TicketCreatedPublisher(natsWrapper.client).publish({
    id: ticket.id,
    title: ticket.title,
    price: ticket.price,
    userId: ticket.userId,
    version: ticket.version
  })
  res.status(201).send(ticket)
})

export default router
// export { router as createTicketRouter}
