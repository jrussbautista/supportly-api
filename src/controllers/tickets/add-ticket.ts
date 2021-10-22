import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { prisma } from '../../lib/prisma';

export const addTicket = catchErrors(async (req: Request, res: Response) => {
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
