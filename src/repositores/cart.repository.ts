import { injectable } from "tsyringe";
import { Cart } from "../models";

@injectable()
export class CartRepository {
  async getAll() {
    return await Cart.findAll();
  }

  async getOne() {
    return await Cart.findOne();
  }

  async getById() {
    return await Cart.findByPk();
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
