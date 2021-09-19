import { Request, Response } from 'express';
import { Ticket } from './../entities/Ticket';

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json({ data: tickets });
  } catch (error) {
    res.status(500).json({ message: 'Error in getting tickets' });
  }
};
