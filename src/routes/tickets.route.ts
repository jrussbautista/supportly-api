import { Router } from 'express';
import { addTicket } from '../controllers/tickets/add-ticket';
import { updateTicket } from '../controllers/tickets/update-ticket';
import { deleteTicket } from '../controllers/tickets/delete-ticket';
import { getTicket } from '../controllers/tickets/get-ticket';
import { getTickets } from '../controllers/tickets/get-tickets';
import { assignTicket } from '../controllers/tickets/assign-ticket';
import { checkAuth } from '../middleware/auth.middleware';
import { getMyTickets } from '../controllers/tickets/get-my-tickets';

const router = Router();

router.use(checkAuth);

router.route('/').get(getTickets);
router.route('/').post(addTicket);
router.route('/mine').get(getMyTickets);
router.route('/:id').get(getTicket);
router.route('/:id').put(updateTicket);
router.route('/:id').delete(deleteTicket);
router.route('/:id/assign').post(assignTicket);

export default router;
