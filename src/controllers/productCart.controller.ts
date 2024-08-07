import { NextFunction, Request, Response } from "express";
import { ProductCartService } from "../services/productCart.service";
import { container } from "tsyringe";
import { NotFoundError, BadRequestError } from "../interfaces/error.classes";
import { Product, ProductCart, User } from "../models";
import { ProductService } from "../services/product.service";
import { UserService } from "../services";

export class ProductCartController {
    // static async getByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
    //     try {
    //         const { userId } = req.params;

    //         const userService: UserService = container.resolve(UserService);
    //         const user: User | null = await userService.getUserById(+userId);
            

    //         const productCartService: ProductCartService = container.resolve(ProductCartService) 
    //         const cart: ProductCart[] = await productCartService.getProductCartbyUser(+userId);

    //         res.status(200).json({ message: 'Product cart succesfuly fetched', data: cart });
    //     } catch (error: any) {
    //         next(error);
    //     }
    // }

    static async addProductToCart(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { cartId, productId, quantity } = req.body;

            if(!cartId || !productId || !quantity) throw new BadRequestError('Cart id, product id and quantity are required');

            const productCartService: ProductCartService = container.resolve(ProductCartService);

            
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
            if(!quantity) throw new BadRequestError('Quantity must be greater than 0');

            const productCartService: ProductCartService = container.resolve(ProductCartService);

            const updatedProductCart: ProductCart = await productCartService.updateProductInCart(+id, quantity );

            res.status(200).json({ message: 'Product quantity updated succesfully', data: updatedProductCart })
        } catch (error: any) {
            next(error);
        }
    }

    static async deleteProductCart (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            const productCartService: ProductCartService = container.resolve(ProductCartService);

            const deletedProductCart: ProductCart = await  productCartService.deleteProductCart(+id);

            res.status(200).json({ message: 'Product cart deleted succesfully', data: deletedProductCart });
        } catch (error: any) {
            next(error);
        }
    }
}