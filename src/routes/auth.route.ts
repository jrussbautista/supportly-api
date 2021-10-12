import { Router } from 'express';
import { login, signup, getMe } from './../controllers/auth.controller';
import { checkAuth } from '../middleware/auth.middleware';

const router = Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/me').get(checkAuth, getMe);

export default router;
