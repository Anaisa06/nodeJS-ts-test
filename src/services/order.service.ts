import { inject, injectable } from "tsyringe";
import { OrderRepository } from "../repositores";
import { Order } from "../models";


@injectable()
export class OrderService {
    constructor(@inject(OrderRepository) private orderRepository: OrderRepository){}

    async getOrdersbyUser(id: number): Promise<Order[]>{
        return await this.orderRepository.getByUser(id);
    }

    async getOrders(): Promise<Order[]>{
        return await this.orderRepository.getAll();
    }

    async createOrder(order: Partial<Order>): Promise<Order>{
        return await this.orderRepository.create(order);
    }

    async updateOrder(id: number, order: Partial<Order>): Promise<number> {
        const [ affectedCount ] = await this.orderRepository.update(id, order);
        return affectedCount;
    }
}