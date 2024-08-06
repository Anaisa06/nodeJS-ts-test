import { injectable } from "tsyringe";
import { Product } from "../models";

@injectable()
export class ProductRepository {
  async getAll() {
    return await Product.findAll();
  }

  async getOne() {
    return await Product.findOne();
  }

  async getById(id: number) {
    return await Product.findByPk(id);
  }

  async create(product: Partial<Product>) {
    return await Product.create(product);
  }

  async update(id: number, product: Partial<Product>) {
    return await Product.update(product, { where: { id } });
  }

  async delete(id: number) {
    return await Product.destroy({ where: { id } });
  }
}
