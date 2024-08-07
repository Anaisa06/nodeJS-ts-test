import { container } from "tsyringe";
import { UserService } from "../services/user.service";
import { BadRequestError } from "../interfaces/error.classes";
import { NextFunction, Request, Response } from "express";
import { RoleService } from "../services/role.service";
import { Order, Role, User } from "../models";
import { OrderService } from "../services/order.service";
import { AuthRequest } from "../middlewares/jwtAuth.middleware";

export class UserController {
  static async getAllUsers( _: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);
      const users: User[] = await userService.getAllUsers();      

      res.status(200).json({ message: "Users fetched succesfully", data: users });
    } catch (error: any) {
      next(error);
    }
  }

  static async getUserById(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const user: User = await userService.getUserById(+req.params.id);

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
      const clientRole: Role = await roleService.getOne("client");

      const { email, password } = req.body;

      if (!email || !password)
        throw new BadRequestError ("Email and password are required");

      const newClient = await userService.createUser({
        email,
        password,
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
      const adminRole: Role = await roleService.getOne("admin");

      const { email, password } = req.body;

      if (!email || !password)
        throw new BadRequestError ("Email and password are required");

      const newClient = await userService.createUser({
        email,
        password,
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

      const userUpdated: User = await userService.updateUser(+id, newValues)

      res.status(200).json({ message: 'User updated succesfully', data: userUpdated }) 
      
    } catch (error: any) {
      next(error)
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userService: UserService = container.resolve(UserService);

      const { id } = req.params   

      const user: User = await userService.deleteUser(+id)

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

      res.status(200).json({ message: 'Orders fetched succesfully', data: orders });
    } catch (error: any) {
      next(error);
    }
  }
}
