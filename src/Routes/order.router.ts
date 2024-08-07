import { Router } from "express";
import { OrderController } from "../controllers/order.controller";
import { authorization, jwtAuth } from "../middlewares/jwtAuth.middleware";

export const orderRouter: Router = Router();

orderRouter.post('/', jwtAuth, authorization('canCreate', 1), OrderController.createOrder);
orderRouter.get('/', jwtAuth, authorization('canRead', 1), OrderController.getAllOrders);
orderRouter.get('/:id/products', OrderController.getProductsByOrderId);
orderRouter.delete('/:id', jwtAuth, authorization('canDelete', 1), OrderController.deleteOrder);