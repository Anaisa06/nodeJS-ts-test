import { inject, injectable } from "tsyringe";
import { CartRepository, OrderRepository, ProductCartRepository } from "../repositores";
import { Cart, Order, Product, ProductCart } from "../models";
import { BadRequestError, NotFoundError } from "../interfaces/error.classes";


@injectable()
export class OrderService {
    constructor(
        @inject(OrderRepository) private orderRepository: OrderRepository,
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository,
        @inject(CartRepository) private cartRepository: CartRepository
    ) { }

    async getOrdersbyUser(id: number): Promise<Order[]> {
        const orders: Order[] = await this.orderRepository.getByUser(id);

        if(!orders.length) throw new NotFoundError (`No orders were found for user with id ${id}`);

        return orders;
    }

    async getAllOrders(): Promise<Order[]> {
        return await this.orderRepository.getAll();
    }

    async getOrderById(id: number): Promise<Order> {
        const order: Order | null = await this.orderRepository.getById(id);
        if(!order) throw new NotFoundError(`Order with id ${id} not found`);
        return order;
    }

    async getProductsByOrderId(id: number): Promise<Product[]> {
        const order: Order = await this.getOrderById(id);

        const productCarts: ProductCart[] = await this.productCartRepository.getByCart(order.cartId);

        const products: Product[] = productCarts.map((cart) => {
            return cart.product;
        })

        return products;
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

    async createOrder(userId: number, cartId: number): Promise<any> {

        const cart: Cart | null = await this.cartRepository.getById(cartId);

        if (!cart) throw new BadRequestError('cart was not found');

        const total: number = await this.getTotalPrice(cart.id);

        console.log(total);

        if(!total) throw new NotFoundError('There are no products in the cart');

        const order: Partial<Order> = {
            total,
            userId,
            cartId: cart.id
        }

        const newOrder = await this.orderRepository.create(order);

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