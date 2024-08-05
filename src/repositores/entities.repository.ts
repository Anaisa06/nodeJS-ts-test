import { injectable } from "tsyringe";
import { Entity } from "../models";

@injectable()
export class EntityRepository {
  async getAll() {
    return await Entity.findAll();
  }

  async getOne() {
    return await Entity.findOne();
  }

  async getById() {
    return await Entity.findByPk();
  }

  async create(entity: Partial<Entity>) {
    return await Entity.create(entity);
  }

  async update(id: number, entity: Partial<Entity>) {
    return await Entity.update(entity, { where: { id } });
  }

  async delete(id: number) {
    return await Entity.destroy({ where: { id } });
  }
}
