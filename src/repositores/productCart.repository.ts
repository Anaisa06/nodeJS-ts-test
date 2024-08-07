import { injectable } from "tsyringe";
import { Product, ProductCart, User } from "../models";

@injectable()
export class ProductCartRepository {
  async getAll() {
    return await ProductCart.findAll();
  }

  async getByCart(cartId: number) {
    return await ProductCart.findAll({ where: { cartId }, include: Product});
  }

  async getById(id: number) {
    return await ProductCart.findByPk(id);
  }

  async create(productCart: Partial<ProductCart>) {
    return await ProductCart.create(productCart);
  }

  async update(id: number, productCart: Partial<ProductCart>) {
    return await ProductCart.update(productCart, { where: { id } });
  }

  async delete(id: number) {
    return await ProductCart.destroy({ where: { id } });
  }
}
