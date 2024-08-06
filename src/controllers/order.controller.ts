import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { OrderService } from "../services";
import { CustomError } from "../helpers/error.helper";
import { Order } from "../models";

export class OrderController {
    static async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { userId, cartId} = req.body;

            if(!userId || !cartId) throw new CustomError(400, 'user Id and cart Id are required');

            const orderService: OrderService = container.resolve(OrderService);

            const newOrder: Order = await orderService.createOrder({ userId, cartId });

            res.status(201).json({ message: 'Order created', data: newOrder });

        } catch (error: any) {
            next(error);
        }
    }

    static async getAllOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const orderService: OrderService = container.resolve(OrderService);
            const orders: Order[] = await orderService.getAllOrders();

            if(!orders.length) throw new CustomError(404, 'No orders were found');

            res.status(200).json({ message: 'Data succesfully fetched', data: orders});
        } catch (error: any) {
            next(error);
        }
    }

    static async deleteOrder(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
      const orderService: OrderService = container.resolve(OrderService);

      const { id } = req.params;      

      const order: number = await orderService.deleteOrder(+id)

      if(!order) throw new CustomError (404, 'order not found');

      res.status(200).json({ message: 'Product deleted succesfully', data: order })
    } catch (error: any) {
      next(error);
    }
  }
    
}