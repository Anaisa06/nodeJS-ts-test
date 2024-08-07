import { inject, injectable } from "tsyringe";
import { CartRepository } from "../repositores";
import { ICreateCart } from "../interfaces/cart.interfaces";
import { Cart } from "../models";
import { NotFoundError } from "../interfaces/error.classes";

@injectable()
export class CartService {
    constructor(@inject(CartRepository) private cartRepository: CartRepository){}

    async createCart(cart: ICreateCart): Promise<Cart>{
        return await this.cartRepository.create(cart);
    }

    async getCartsByUserId(userId: number) {
        const carts: Cart[] = await this.cartRepository.getByUser(userId);

        if(!carts) throw new NotFoundError('No carts found for user');
        
        return carts;
    }
}