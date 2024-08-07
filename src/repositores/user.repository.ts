import { injectable } from "tsyringe";
import { Role, User } from "../models";

@injectable()
export class UserRepository {
  async getAll() {
    return await User.findAll({ attributes: { exclude: ['password']}});
  }

  async getOne(email: string) {
    return await User.findOne({ where: { email }, include: Role });
  }

  async getById(id: number) {
    return await User.findByPk(id, { attributes: { exclude: ['password']}});
  }

  async create(user: Partial<User>) {
    return await User.create(user);
  }

  async update(id: number, user: Partial<User>) {
    return await User.update(user, { where: { id } });
  }

  async delete(id: number) {
    return await User.destroy({ where: { id } });
  }
}
