import { container } from "tsyringe";
import { UserService } from "../services/user.service";
import { CustomError } from "../helpers/error.helper";
import { NextFunction, Request, Response } from "express";
import { encryptHelper } from "../helpers/bcrypt.helper";
import { RoleService } from "../services/role.service";
import { Order, Role, User } from "../models";
import { OrderService } from "../services/order.service";
import { AuthRequest } from "../middlewares/jwtAuth.middleware";

export class UserController {
  static async getAllUsers( _: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);
      const users: User[] = await userService.getAllUsers();

      if (!users.length) throw new CustomError(404, "No users were found");

      res
        .status(200)
        .json({ message: "Users fetched succesfully", data: users });
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const user: User|null = await userService.getUserById(+req.params.id);
      if (!user) throw new CustomError(404, "User not found");

      res.status(200).json({ message: "User fetched succesfully", data: user });
    } catch (error: any) {
      next(error);
    }
  }

  static async createRegularUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const roleService: RoleService = container.resolve(RoleService);
      const clientRole: Role | null = await roleService.getOne("client");

      if (!clientRole) throw new CustomError(404, 'Role "client" not found');

      const { email, password } = req.body;

      if (!email || !password)
        throw new CustomError(400, "Email and password are required");

      const hashedPassword = await encryptHelper(password);

      const newClient = await userService.createUser({
        email,
        password: hashedPassword,
        roleId: clientRole.id,
      });

      res.status(201).json({ message: "Client created succesfuly", data: newClient });
    } catch (error: any) {
      next(error);
    }
  }

  static async createAdminUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const roleService: RoleService = container.resolve(RoleService);
      const adminRole: Role | null = await roleService.getOne("admin");

      if (!adminRole) throw new CustomError(404, 'Role "admin" not found');

      const { email, password } = req.body;

      if (!email || !password)
        throw new CustomError(400, "Email and password are required");

      const hashedPassword = await encryptHelper(password);

      const newClient = await userService.createUser({
        email,
        password: hashedPassword,
        roleId: adminRole.id,
      });

      res.status(201).json({ message: "Admin created succesfuly", data: newClient });

    } catch (error: any) {
      next(error);
    }
  }

  static async updateUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const newValues = req.body;

      const userService: UserService = container.resolve(UserService);

      const user = await userService.getUserById(+id)
      if(!user) throw new CustomError (404, 'User not found');

      if(newValues.password) {
         const hashedPassword = await encryptHelper(newValues.password);
         newValues.password = hashedPassword
      }     

      await userService.updateUser(+id, newValues)

      const userUpdated = await userService.getUserById(+id)

      res.status(200).json({ message: 'User updated succesfully', data: userUpdated }) 
      
    } catch (error: any) {
      next(error)
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const { id } = req.params

      const user = await userService.getUserById(+id)
      if(!user) throw new CustomError (404, 'User not found');

      await userService.deleteUser(+id)

      res.status(200).json({ message: 'User deleted succesfully', data: user })
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const orderService: OrderService = container.resolve(OrderService);
      const { id } = req.params;

      const orders: Order[] = await orderService.getOrdersbyUser(+id);

      if(!orders.length) throw new CustomError(404, `No orders were found for user with id ${id}`);

      res.status(200).json({ message: 'Orders fetched succesfully', data: orders });
    } catch (error: any) {
      next(error);
    }
  }
}
