import { Router } from "express";
import { OrderController } from "../controllers/order.controller";

export const orderRouter: Router = Router();

orderRouter.post('/', OrderController.createOrder);
orderRouter.get('/', OrderController.getAllOrders);
orderRouter.delete('/:id', OrderController.deleteOrder);