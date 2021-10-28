import { Request, Response } from 'express';

import catchErrors from '../../utils/catch-errors';
import { prisma } from '../../lib/prisma';

export const getTickets = catchErrors(async (req: Request, res: Response) => {
  const INITIAL_LIMIT = 20;
  const INITIAL_PAGE = 1;

  const query = req.query;
  const page = Number(query.page) || INITIAL_PAGE;
  const take = Number(query.limit) || INITIAL_LIMIT;

  const skip = (page - 1) * take;

  const where = {
    deletedAt: null,
  };

  const total = await prisma.ticket.count({ where });

  const tickets = await prisma.ticket.findMany({
    take,
    skip,
    where,
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
