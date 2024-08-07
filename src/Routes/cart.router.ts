import { Router } from "express";
import { CartController } from "../controllers/cart.controller";
import { jwtAuth } from "../middlewares/jwtAuth.middleware";

export const cartRouter: Router = Router();

cartRouter.get('/:userId/user', CartController.getCartsByUserId)
cartRouter.post('/', jwtAuth, CartController.createCart)