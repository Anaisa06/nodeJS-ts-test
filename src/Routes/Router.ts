import { Router } from 'express';
import { authRouter, cartRouter, orderRouter, productCartRouter, productsRouter, rolesRouter, userRouter } from './';

const router: Router = Router();

router.use('/roles', rolesRouter);
router.use('/users', userRouter);
router.use('/products', productsRouter);
router.use('/product-cart', productCartRouter);
router.use('/orders', orderRouter);
router.use('/auth', authRouter);
router.use('/carts', cartRouter);

export default router;