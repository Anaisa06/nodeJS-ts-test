import { injectable, inject } from "tsyringe";
import { CartRepository, ProductCartRepository, ProductRepository, UserRepository } from "../repositores";
import { Product, ProductCart, User } from "../models";
import { BadRequestError, NotFoundError } from "../interfaces/error.classes";
import { ICreateProductCart } from "../interfaces/productCart.interfaces";

@injectable()
export class ProductCartService {
    constructor(
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository,
        @inject(CartRepository) private cartRepository: CartRepository,
        @inject(ProductRepository) private productRepository: ProductRepository,
        @inject(UserRepository) private userRepository: UserRepository    
    ){}

    async getCartById(id: number): Promise<ProductCart|null> {
        return await this.productCartRepository.getById(id);
    }

    // async getProductCartbyUser(userId: number): Promise<ProductCart[]> {

    //     const user: User | null = await this.userRepository.getById(userId);

    //     if(!user) throw new NotFoundError('User not found');

    //     const cart = await this.cartRepository.getByUser(userId);

    //     if(!cart) throw new NotFoundError('Cart not found');

    //     return await this.productCartRepository.getByCart(cart.id);    
    // }


    async addProductsToCart(productCart: ICreateProductCart): Promise<ProductCart>{

        const product: Product | null = await this.productRepository.getById(productCart.productId);

        if(!product || product.stock === 0) throw new NotFoundError(`Product with id ${productCart.productId} not found or out of stock`);

        const cart = await this.cartRepository.getById(productCart.cartId);

        if(!cart) throw new NotFoundError(`Cart with id ${productCart.cartId} not found`);

        if(!this.verifyStock(product.stock, productCart.quantity)) throw new BadRequestError('There is not enought stock');

        const newCart: ProductCart = await this.productCartRepository.create(productCart);

        if(newCart) {
            //Update product stock
            await this.productRepository.update(product.id, { stock: product.stock - productCart.quantity});
        }

        return newCart;
    }

    private verifyStock(stock: number, quantity: number): boolean {
        if (stock < quantity) return false;

        return true;
    }

    async updateProductInCart(id: number, quantity: number): Promise<ProductCart> {

        const productCart: ProductCart | null = await this.productCartRepository.getById(id);

        if(!productCart) throw new NotFoundError('Product cart not found');

        const product: Product | null = await this.productRepository.getById(productCart.productId);
        if(!product) throw new NotFoundError('Product not found');

        if(productCart.quantity < quantity){
            //Verify stock
            const extraItems: number = quantity - productCart.quantity;

            if(!this.verifyStock(product.stock, extraItems)) throw new BadRequestError('There is not enough stock');

            //Update product stock
            await this.productRepository.update(product.id, { stock: product.stock - extraItems});
        } else {
            const lessItems: number = productCart.quantity - quantity;

            //Update product stock
            await this.productRepository.update(product.id, { stock: product.stock + lessItems });
        }

        await this.productCartRepository.update(id,{ quantity });

        const updatedCart: ProductCart | null = await this.productCartRepository.getById(id);
        if(!updatedCart) throw new NotFoundError('Somenthing went wrong')
        return updatedCart;
    }

    async deleteProductCart(productCartId: number): Promise<ProductCart> {

        const productCart: ProductCart | null = await this.productCartRepository.getById(productCartId);
        if(!productCart) throw new NotFoundError('Product cart not found');
        const product: Product | null = await this.productRepository.getById(productCart.productId);
        if(!product) throw new NotFoundError('Product not found');

        //Update stock
        await this.productRepository.update(product.id, { stock: product.stock + productCart.quantity });

        //Delete product cart
        await this.productCartRepository.delete(productCartId);

        return productCart;
    }
}