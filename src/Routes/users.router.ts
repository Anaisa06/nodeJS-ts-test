import { Router } from 'express';
import { UserController } from '../controllers/user.controller';

export const userRouter: Router = Router();

userRouter.get('/', UserController.getAllUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/register', UserController.createRegularUser);
userRouter.post('/admin', UserController.createAdminUser);
userRouter.patch('/:id', UserController.updateUser);
userRouter.delete('/:id', UserController.deleteUser);
userRouter.get('/:id/orders', UserController.getUserOrders);