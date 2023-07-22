import { Router } from 'express';
import { V, Validator } from '../middleware/validation';
import auth from '../middleware/auth';
import { signin, change } from '../controllers/auth';

const router: Router = Router();

router
    .route('/')
    .post(V.body(Validator.Users.Auth.Login), signin)
    .put(auth, V.body(Validator.Users.Auth.Profile), change);

export default router;
