import { injectable } from "tsyringe";
import { ProductCart } from "../models";

@injectable()
export class ProductCartRepository {
  async getAll() {
    return await ProductCart.findAll();
  }

  async getOne() {
    return await ProductCart.findOne();
  }

  async getById() {
    return await ProductCart.findByPk();
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
