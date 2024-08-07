import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/jwtAuth.middleware";
import { CartService } from "../services/cart.service";
import { container } from "tsyringe";
import { Cart } from "../models";

export class CartController {
    static async createCart(req: AuthRequest, res: Response, next: NextFunction): Promise <void> {
        try {
            const { id } = req.user;

            const cartService: CartService = container.resolve(CartService);

            const newCart: Cart = await cartService.createCart({ userId: id });

            res.status(201).json({ message: 'Cart created succesfully', data: newCart });
        } catch (error: any) {
            next(error);
        }
    }

    static async getCartsByUserId(req: AuthRequest, res: Response, next: NextFunction): Promise <void> {
        try {

            const {userId} = req.params;
            const cartService: CartService = container.resolve(CartService);

            const carts: Cart[] = await cartService.getCartsByUserId(+userId);
            res.status(200).json({ message: 'Carts fetched succesfully', data: carts });
        } catch (error: any) {
            next(error);
        }
    }
}