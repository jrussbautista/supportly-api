import { Request, Response } from 'express';
import { User } from '@prisma/client';
import catchErrors from '../../utils/catch-errors';
import { EntityNotFoundError, ForbiddenError } from '../../utils/custom-error';
import { prisma } from '../../lib/prisma';

export const getTickets = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
    },
  });

  res.status(200).json({ tickets });
});

export const getTicket = catchErrors(async (req: Request, res: Response) => {
  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({ where: { id: Number(id) } });

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  res.status(200).json({ ticket });
});

export const createTicket = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const { title, description, priority } = req.body;

  const ticket = await prisma.ticket.create({
    data: {
      title,
      description,
      status: 'OPEN',
      priority,
      userId: user.id,
    },
  });

  res.status(200).json({ ticket });
});

export const updateTicket = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const id = parseInt(req.params.id);

  let ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  if (user.id !== ticket.userId) {
    throw new ForbiddenError('You are not allowed to perform this action.');
  }

  ticket = await prisma.ticket.update({
    where: {
      id,
    },
    data: {
      ...req.body,
    },
  });

  res.status(200).json({ ticket });
});

export const deleteTicket = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const id = parseInt(req.params.id);

  let ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  await prisma.ticket.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  res.status(204).send();
});
