import express, { Request, Response } from 'express'
import Ticket from '../models/ticket'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response) => {
  const tickets = await Ticket.find({orderId: undefined}) // only tickets don't have corresponding orders
  res.send(tickets)
})

export default router