import { inject, injectable } from "tsyringe";
import { CartRepository, OrderRepository, ProductCartRepository } from "../repositores";
import { Cart, Order } from "../models";
import { CustomError } from "../helpers/error.helper";


@injectable()
export class OrderService {
    constructor(
        @inject(OrderRepository) private orderRepository: OrderRepository,
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository,
        @inject(CartRepository) private cartRepository: CartRepository
    ) { }

    async getOrdersbyUser(id: number): Promise<Order[]> {
        return await this.orderRepository.getByUser(id);
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAll();
    }

    private async getTotalPrice(cartId: number) {
        const productCart = await this.productCartRepository.getByCart(cartId);

        let accum: number = 0;

        productCart.forEach(cart => {
            accum += (cart.quantity * cart.product.price)
        })

        console.log(accum)
        return accum;
    }

    async createOrder(userId: number): Promise<any> {

        const cart: Cart | null = await this.cartRepository.getByUser(userId);

        if (!cart) throw new CustomError(400, 'cart was not found');

        const total: number = await this.getTotalPrice(cart.id);

        if(!total) throw new CustomError(400, 'There are no products in the cart');

        const order: Partial<Order> = {
            total,
            userId,
            cartId: cart.id
        }

        const newOrder = await this.orderRepository.create(order);

        //deelte cartsproduct

        return newOrder;
    }

    async updateOrder(id: number, order: Partial<Order>): Promise<number> {
        const [affectedCount] = await this.orderRepository.update(id, order);
        return affectedCount;
    }

    async deleteOrder(id: number): Promise<number> {
        return this.orderRepository.delete(id);
    }
}