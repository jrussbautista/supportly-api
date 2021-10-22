import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { EntityNotFoundError, ForbiddenError } from '../../utils/custom-error';
import { prisma } from '../../lib/prisma';

export const getTicket = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const { id } = req.params;

  const ticket = await prisma.ticket.findUnique({
    where: { id: Number(id) },
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

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  if (user.id !== ticket.userId) {
    throw new ForbiddenError('You are not allowed to perform this action.');
  }

  res.status(200).json({ ticket });
});
