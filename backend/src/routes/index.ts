import { Router } from 'express';
import auth from './auth';
import location from './location';

const router: Router = Router();
router.use('/auth', auth);
router.use('/location', location);

export default router;
