import { Router } from 'express';
import { addTicket } from '../controllers/tickets/add-ticket';
import { updateTicket } from '../controllers/tickets/update-ticket';
import { deleteTicket } from '../controllers/tickets/delete-ticket';
import { getTicket } from '../controllers/tickets/get-ticket';
import { getTickets } from '../controllers/tickets/get-tickets';
import { assignTicket } from '../controllers/tickets/assign-ticket';
import { checkAuth, restrictTo } from '../middleware/auth.middleware';
import { getMyTickets } from '../controllers/tickets/get-my-tickets';

const router = Router();

router.use(checkAuth);

router.route('/').get(restrictTo('ADMIN'), getTickets);
router.route('/').post(restrictTo('USER', 'ADMIN'), addTicket);
router.route('/mine').get(restrictTo('USER', 'ADMIN'), getMyTickets);
router.route('/:id').get(restrictTo('USER', 'ADMIN'), getTicket);
router.route('/:id').put(restrictTo('USER', 'ADMIN'), updateTicket);
router.route('/:id').delete(restrictTo('USER', 'ADMIN'), deleteTicket);
router.route('/:id/assign').post(restrictTo('ADMIN'), assignTicket);

export default router;
