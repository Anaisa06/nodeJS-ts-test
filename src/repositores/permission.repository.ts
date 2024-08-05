import { injectable } from "tsyringe";
import { Permission } from "../models";

@injectable()
export class PermissionRepository {
  async getAll() {
    return await Permission.findAll();
  }

  async getOne() {
    return await Permission.findOne();
  }

  async getById() {
    return await Permission.findByPk();
  }

  async create(permission: Partial<Permission>) {
    return await Permission.create(permission);
  }

  async update(id: number, permission: Partial<Permission>) {
    return await Permission.update(permission, { where: { id } });
  }

  async delete(id: number) {
    return await Permission.destroy({ where: { id } });
  }
}
