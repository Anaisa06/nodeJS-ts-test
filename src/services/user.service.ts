import { inject, injectable } from "tsyringe";
import { CartRepository, UserRepository } from "../repositores";
import { User } from "../models";
import { Order } from "sequelize";

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(CartRepository) private cartRepository: CartRepository
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);

    await this.cartRepository.create({ userId: newUser.id });

    return newUser

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
    const [ affectedCount ] = await this.userRepository.update(id, user);
    return affectedCount;
  }

  async deleteUser(id: number): Promise<number> {
    return await this.userRepository.delete(id);
  }
}
