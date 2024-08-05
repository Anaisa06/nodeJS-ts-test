import { injectable } from "tsyringe";
import { Role } from "../models";

@injectable()
export class RoleRepository {
  async getAll() {
    return await Role.findAll();
  }  

  async create(role: Partial<Role>) {
    return await Role.create(role);
  }  

  async getOne(name: string) {
    return await Role.findOne({ where: { name } });
  }
}
