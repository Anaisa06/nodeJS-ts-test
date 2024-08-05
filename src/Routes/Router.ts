import { Router } from 'express';
import { rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);

export default router;