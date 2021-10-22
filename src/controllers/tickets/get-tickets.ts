import { Request, Response } from 'express';

import catchErrors from '../../utils/catch-errors';
import { prisma } from '../../lib/prisma';

export const getTickets = catchErrors(async (req: Request, res: Response) => {
  const tickets = await prisma.ticket.findMany({
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
