import { Router } from 'express';
import { V, Validator } from '../middleware/validation';
import auth from '../middleware/auth';
import { get, save } from '../controllers/location';

const router: Router = Router();

router
    .route('/')
    .get(get)
    .post(auth, V.body(Validator.Users.Location.Value), save);

export default router;
