import { Router } from 'express';

import { getMe } from '../controllers/auth/get-me';
import { login } from '../controllers/auth/login';
import { signup } from '../controllers/auth/sign-up';
import { checkAuth } from '../middleware/auth.middleware';

const router = Router();

router.route('/login').post(login);
router.route('/signup').post(signup);
router.route('/me').get(checkAuth, getMe);

export default router;
