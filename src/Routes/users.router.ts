import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { jwtAuth, authorization } from '../middlewares/jwtAuth.middleware';

export const userRouter: Router = Router();

userRouter.get('/', jwtAuth, authorization('canRead', 2), UserController.getAllUsers);
userRouter.get('/:id', jwtAuth, authorization('canRead', 2), UserController.getUserById);
userRouter.post('/register', jwtAuth, authorization('canCreate', 2), UserController.createRegularUser);
userRouter.post('/admin', jwtAuth, authorization('canCreate', 2), UserController.createAdminUser);
userRouter.patch('/:id', jwtAuth, authorization('canUpdate', 2), UserController.updateUser);
userRouter.delete('/:id', jwtAuth, authorization('canDelete', 2), UserController.deleteUser);
userRouter.get('/:id/orders', jwtAuth, authorization('canRead', 2), UserController.getUserOrders);