import { injectable } from "tsyringe";
import { Cart } from "../models";

@injectable()
export class CartRepository {
  async getAll() {
    return await Cart.findAll();
  }

  async getByUser(userId: number) {
    return await Cart.findAll({ where: { userId }});
  }

  async getById(id: number) {
    return await Cart.findByPk(id);
  }

  async create(cart: Partial<Cart>) {
    return await Cart.create(cart);
  }

  async update(id: number, cart: Partial<Cart>) {
    return await Cart.update(cart, { where: { id } });
  }

  async delete(id: number) {
    return await Cart.destroy({ where: { id } });
  }
}
