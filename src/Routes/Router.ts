import { Router } from 'express';
import { productsRouter, rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);
router.use('/products', productsRouter);

export default router;