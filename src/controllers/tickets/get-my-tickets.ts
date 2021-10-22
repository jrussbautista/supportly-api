import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { prisma } from '../../lib/prisma';

export const getMyTickets = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const tickets = await prisma.ticket.findMany({
    where: {
      userId: user.id,
      deletedAt: null,
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

  res.status(200).json({ tickets });
});
