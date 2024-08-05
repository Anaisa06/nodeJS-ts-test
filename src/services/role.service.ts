import { inject, injectable } from "tsyringe";
import { RoleRepository } from "../repositores";
import { Role } from "../models";

@injectable()
export class RoleService {
    constructor(@inject(RoleRepository) private roleRepository: RoleRepository){}

    async getAllRoles(): Promise<Role[]> {
        return await this.roleRepository.getAll();
    }

    async createRole(role: Partial<Role>): Promise<Role>{
        return await this.roleRepository.create(role);
    }

    async getOne(name: string): Promise<Role|null> {
        return await this.roleRepository.getOne(name);
    }
}