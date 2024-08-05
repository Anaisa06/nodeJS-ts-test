import { inject, injectable } from "tsyringe";
import { OrderRepository } from "../repositores";
import { Order } from "../models";


@injectable()
export class OrderService {
    constructor(@inject(OrderRepository) private orderRepository: OrderRepository){}

    async getOrdersbyUser(id: number): Promise<Order[]>{
        return await this.orderRepository.getByUser(id);
    }
}