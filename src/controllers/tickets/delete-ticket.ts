import { Request, Response } from 'express';
import { User } from '@prisma/client';

import catchErrors from '../../utils/catch-errors';
import { EntityNotFoundError, ForbiddenError } from '../../utils/custom-error';
import { prisma } from '../../lib/prisma';

export const deleteTicket = catchErrors(async (req: Request, res: Response) => {
  const user = req.user as User;

  const id = parseInt(req.params.id);

  let ticket = await prisma.ticket.findUnique({ where: { id } });

  if (!ticket) {
    throw new EntityNotFoundError('Ticket');
  }

  if (user.id !== ticket.userId && user.role !== 'ADMIN') {
    throw new ForbiddenError('You are not allowed to perform this action.');
  }

  await prisma.ticket.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  res.status(204).send();
});
