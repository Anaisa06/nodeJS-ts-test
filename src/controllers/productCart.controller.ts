import { NextFunction, Request, Response } from "express";
import { ProductCartService } from "../services/productCart.service";
import { container } from "tsyringe";
import { CustomError } from "../helpers/error.helper";
import { Product, ProductCart, User } from "../models";
import { ProductService } from "../services/product.service";
import { UserService } from "../services";

export class ProductCartController {
    static async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId } = req.params;

            const userService: UserService = container.resolve(UserService);
            const user: User | null = await userService.getUserById(+userId);
            if(!user) throw new CustomError(404, 'User not found');

            const productCartService: ProductCartService = container.resolve(ProductCartService) 
            const cart: ProductCart[] = await productCartService.getProductCartbyUser(+userId);

            res.status(200).json({ message: 'Product cart succesfuly fetched', data: cart });
        } catch (error: any) {
            next(error);
        }
    }

    static async addProductToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cartId, productId, quantity } = req.body;

            if(!cartId || !productId || !quantity) throw new CustomError(400, 'Cart id, product id and quantity are required');

            const productCartService: ProductCartService = container.resolve(ProductCartService);

            const productService: ProductService = container.resolve(ProductService);
            const product: Product | null = await productService.getProductById(productId);
            
            if(!product || product.stock === 0) throw new CustomError(404, 'Product not found or out of stock');

            const productCart: ProductCart = await productCartService.addProductsToCart({ cartId, productId, quantity: +quantity });

            res.status(201).json({ message: 'Product added to cart succesfully', data: productCart });
            
        } catch (error: any) {
            next(error);
        }
    }

    static async updateProductsQuantity(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            if(!quantity) throw new CustomError(400, 'Quantity must be greater than 0');

            const productCartService: ProductCartService = container.resolve(ProductCartService);

            const productCart = await productCartService.getCartById(+id);
            if(!productCart) throw new CustomError(404, 'Cart was not found');
            await productCartService.updateProductInCart(+id, { quantity: +quantity });

            const updatedProductCart = await productCartService.getCartById(+id);
            res.status(200).json({ message: 'Product quantity updated succesfully', data: updatedProductCart })
        } catch (error: any) {
            next(error);
        }
    }
}