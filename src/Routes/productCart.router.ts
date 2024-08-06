import { Router } from "express";
import { ProductCartController } from "../controllers/productCart.controller";

export const productCartRouter: Router = Router();

productCartRouter.get('/user/:userId', ProductCartController.getByUserId);
productCartRouter.post('/', ProductCartController.addProductToCart);
productCartRouter.patch('/:id', ProductCartController.updateProductsQuantity);