import { Request, Response } from 'express';
import catchErrors from '../../utils/catch-errors';

export const getMe = catchErrors(async (req: Request, res: Response) => {
  res.status(200).json({ user: req.user });
});
