import { injectable, inject } from "tsyringe";
import { CartRepository, ProductCartRepository } from "../repositores";
import { ProductCart } from "../models";
import { CustomError } from "../helpers/error.helper";

@injectable()
export class ProductCartService {
    constructor(
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository,
        @inject(CartRepository) private cartRepository: CartRepository    
    ){}

    async getCartById(id: number): Promise<ProductCart|null> {
        return await this.productCartRepository.getById(id);
    }

    async getProductCartbyUser(userId: number): Promise<ProductCart[]> {
        const cart = await this.cartRepository.getByUser(userId);

        if(!cart) throw new CustomError(404, 'Cart not found');

        return await this.productCartRepository.getByCart(cart.id);    
    }


    async addProductsToCart(productCart: Partial<ProductCart>): Promise<ProductCart>{

        return await this.productCartRepository.create(productCart);
    }

    async updateProductInCart(id: number, quantity: Partial<ProductCart>): Promise<number> {
        const [ affectedCount ] = await this.productCartRepository.update(id, quantity);
        return affectedCount;
    }

    async deleteProductInCart(productId: number): Promise<number> {
        return await this.productCartRepository.deleteByProduct(productId);
    }
}