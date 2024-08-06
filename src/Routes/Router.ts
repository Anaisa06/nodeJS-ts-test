import { Router } from 'express';
import { productCartRouter, productsRouter, rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/cart', productCartRouter);

export default router;