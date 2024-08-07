import { inject, injectable } from "tsyringe";
import jwt from "jsonwebtoken";
import { CartRepository, PermissionRepository, UserRepository } from "../repositores";
import { Permission, User } from "../models";
import dotenv from 'dotenv';
import { BadRequestError, NotFoundError } from "../interfaces/error.classes";
import { ICreateUser, IUpdateUser, IUserWithPermission } from "../interfaces/user.interfaces";
import { encryptHelper } from "../helpers/bcrypt.helper";

dotenv.config();

@injectable()
export class UserService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(PermissionRepository) private permissionRepository: PermissionRepository
  ) { }

  async createUser(user: ICreateUser): Promise<User> {

    const hashedPassword: string = await encryptHelper(user.password);

    const newUser: User = await this.userRepository.create({...user, password: hashedPassword});

    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    const users: User[] = await this.userRepository.getAll();

    if (!users.length) throw new NotFoundError ("No users were found");

    return users;

  }

  async getUserById(id: number): Promise<User> {
    const user: User | null = await this.userRepository.getById(id);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    const user: User | null = await this.userRepository.getOne(email);
    if (!user) throw new NotFoundError('User not found');
    return user;
  }

  async updateUser(id: number, user: IUpdateUser): Promise<User> {

    if(user.password) {
      const hashedPassword = await encryptHelper(user.password);
      user.password = hashedPassword;
    }

    const [affectedCount] = await this.userRepository.update(id, user);

    if (!affectedCount) throw new NotFoundError('User not found');

    const updatedUser: User = await this.getUserById(id);

    return updatedUser;
  }

  async deleteUser(id: number): Promise<User> {

    const user: User | null = await this.getUserById(id);

    if(!user) throw new NotFoundError ('User not found');
    
    await this.userRepository.delete(id);

    return user;
  }

  async generateToken(user: Partial<User>): Promise<string> {

    if (!user.role) throw new BadRequestError('User role is not defined');

    const userPermission: Permission[] = await this.permissionRepository.getByRole(user.role.id);

    const userWithPermission: IUserWithPermission = {
      ...user,
      permission: userPermission
    }

    const secret: string = process.env.JWT_SECRET as string;

    const token: string = jwt.sign(userWithPermission, secret, { expiresIn: "12h" });

    return token;
  };
}
