import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { CartRepository, PermissionRepository, UserRepository } from "../repositores";
import { User } from "../models";
import dotenv from 'dotenv';
import { CustomError } from "../helpers/error.helper";

dotenv.config();

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(CartRepository) private cartRepository: CartRepository,
    @inject(PermissionRepository) private permissionRepository: PermissionRepository
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser: User = await this.userRepository.create(user);

    await this.cartRepository.create({ userId: newUser.id });

    return newUser;
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

  async generateToken (user: Partial<User>): Promise<string> {

    if(!user.role) throw new CustomError(400, 'User role is not defined');

    const userPermission = await this.permissionRepository.getByRole(user.role.id);

    const userWithPermission = {
      ...user,
      permission: userPermission
    }

    const secret: string = process.env.JWT_SECRET as string;

    const token: string = jwt.sign(userWithPermission, secret, { expiresIn: "12h" });

    return token;
};
}
