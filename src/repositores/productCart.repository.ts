import { injectable } from "tsyringe";
import { ProductCart } from "../models";

@injectable()
export class ProductCartRepository {
  async getAll() {
    return await ProductCart.findAll();
  }

  async getByCart(cartId: number) {
    return await ProductCart.findAll({ where: { cartId }});
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

  async deleteByProduct(productId: number) {
    return await ProductCart.destroy({ where: { productId } });
  }
}
