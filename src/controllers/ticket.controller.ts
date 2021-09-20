import { Request, Response } from 'express';
import { Ticket } from './../entities/Ticket';
import catchErrors from '../utils/catch-errors';

export const getTickets = catchErrors(async (req: Request, res: Response) => {
  const tickets = await Ticket.find();
  res.status(200).json({ data: tickets });
});
