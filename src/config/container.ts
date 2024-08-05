import { container } from "tsyringe";
import { OrderService, RoleService, UserService } from "../services";

container.registerSingleton<RoleService>(RoleService);

container.registerSingleton<UserService>(UserService);

container.registerSingleton<OrderService>(OrderService);