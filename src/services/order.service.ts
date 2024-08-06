import { inject, injectable } from "tsyringe";
import { OrderRepository, ProductCartRepository } from "../repositores";
import { Order } from "../models";


@injectable()
export class OrderService {
    constructor(
        @inject(OrderRepository) private orderRepository: OrderRepository,
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository
    ){}

    async getOrdersbyUser(id: number): Promise<Order[]>{
        return await this.orderRepository.getByUser(id);
    }

    async getOrders(): Promise<Order[]>{
        return await this.orderRepository.getAll();
    }

    // async createOrder(cartId: number, order: Partial<Order>, quantity: number, ): Promise<Order>{

    //     const newOrder = await this.orderRepository.create(order);
    //     const newProductCart = await this.productCartRepository.create({p})
    // }

    async updateOrder(id: number, order: Partial<Order>): Promise<number> {
        const [ affectedCount ] = await this.orderRepository.update(id, order);
        return affectedCount;
    }
}