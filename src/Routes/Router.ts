import { Router } from 'express';
import { authRouter, orderRouter, productCartRouter, productsRouter, rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/carts', productCartRouter);
router.use('/orders', orderRouter);
router.use('/auth', authRouter);

export default router;