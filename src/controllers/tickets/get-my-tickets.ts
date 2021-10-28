import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { prisma } from '../../lib/prisma';

export const getMyTickets = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const query = req.query;
  const page = Number(query.page) || 1;
  const take = Number(query.limit) || 5;

  const skip = (page - 1) * take;

  const total = await prisma.ticket.count({
    where: {
      userId: user.id,
      deletedAt: null,
    },
  });

  const tickets = await prisma.ticket.findMany({
    take,
    skip,
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

  res.status(200).json({ tickets, total });
});
