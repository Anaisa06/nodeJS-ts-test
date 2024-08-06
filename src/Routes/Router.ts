import { Router } from 'express';
import { orderRouter, productCartRouter, productsRouter, rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/carts', productCartRouter);
router.use('/orders', orderRouter);

export default router;