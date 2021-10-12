import { Router } from 'express';
import {
  createTicket,
  deleteTicket,
  getTicket,
  updateTicket,
  getTickets,
} from '../../controllers/account/tickets.controller';
import { checkAuth } from '../../middleware/auth.middleware';

const router = Router();

router.use(checkAuth);

router.route('/').get(getTickets);
router.route('/').post(createTicket);
router.route('/:id').get(getTicket);
router.route('/:id').put(updateTicket);
router.route('/:id').delete(deleteTicket);

export default router;
