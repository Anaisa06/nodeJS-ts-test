import { inject, injectable } from "tsyringe";
import { UserRepository } from "../repositores";
import { User } from "../models";
import { Order } from "sequelize";

@injectable()
export class UserService {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async createUser(user: Partial<User>): Promise<User> {
    return await this.userRepository.create(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.getAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.getById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.getOne(email);
  }

  async updateUser(id: number, user: Partial<User>): Promise<number>{
    const [ affectedRows ] = await this.userRepository.update(id, user);
    return affectedRows;
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }
}
