import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { EntityNotFoundError } from '../../utils/custom-error';
import { prisma } from '../../lib/prisma';

export const assignTicket = catchErrors(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user as User;

  const ticketId = Number(id);
  const assignedToUserId = Number(req.body.assignedToUserId);
  const assignedByUserId = user.id;

  let ticket = await prisma.ticket.findUnique({
    where: { id: ticketId },
  });

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  const assignedUser = await prisma.user.findUnique({
    where: {
      id: Number(assignedToUserId),
    },
  });

  if (!assignedUser) {
    throw new EntityNotFoundError('User');
  }

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  ticket = await prisma.ticket.update({
    where: {
      id: ticketId,
    },
    data: {
      assignedByUserId,
      assignedToUserId,
      assignedAt: new Date(),
    },
    include: {
      assignedTo: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
      assignedBy: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  res.status(200).json({ ticket });
});
