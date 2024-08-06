import { inject, injectable } from "tsyringe";
import { OrderRepository, ProductCartRepository } from "../repositores";
import { Order } from "../models";
import { CustomError } from "../helpers/error.helper";


@injectable()
export class OrderService {
    constructor(
        @inject(OrderRepository) private orderRepository: OrderRepository,
        @inject(ProductCartRepository) private productCartRepository: ProductCartRepository
    ){}

    async getOrdersbyUser(id: number): Promise<Order[]>{
        return await this.orderRepository.getByUser(id);
    }

    async getAllOrders(): Promise<Order[]>{
        return await this.orderRepository.getAll();
    }

    private async getTotalPrice(cartId: number){
        const productCart = await this.productCartRepository.getByCart(cartId);

        let accum: number = 0;      

       productCart.forEach(cart => {
             accum += (cart.quantity * cart.product.price)      
        })

        console.log(accum)
        return accum;
    }

    async createOrder(order: Partial<Order>): Promise<any>{

        if(!order.cartId) throw new CustomError(400, 'cart id is required');

        const total: number = await this.getTotalPrice(order.cartId);

        order.total = total

        const newOrder = await this.orderRepository.create(order);

        //deelte cartsproduct

        return newOrder;
    }

    async updateOrder(id: number, order: Partial<Order>): Promise<number> {
        const [ affectedCount ] = await this.orderRepository.update(id, order);
        return affectedCount;
    }

    async deleteOrder(id: number): Promise<number> {
        return this.orderRepository.delete(id);
    }
}