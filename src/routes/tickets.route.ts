import { Router } from 'express';
import { getTickets } from './../controllers/ticket.controller';

const router = Router();

router.route('/').get(getTickets);

export default router;
