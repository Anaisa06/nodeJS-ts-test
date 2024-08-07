import { injectable } from "tsyringe";
import { Order } from "../models";

@injectable()
export class OrderRepository {
  async getAll() {
    return await Order.findAll();
  }

  async getByUser(userId: number) {
    return await Order.findAll({ where: { userId }})
  }

  async getOne() {
    return await Order.findOne();
  }

  async getById(id: number) {
    return await Order.findByPk(id);
  }

  async create(order: Partial<Order>) {
    return await Order.create(order);
  }

  async update(id: number, order: Partial<Order>) {
    return await Order.update(order, { where: { id } });
  }

  async delete(id: number) {
    return await Order.destroy({ where: { id } });
  }
}
