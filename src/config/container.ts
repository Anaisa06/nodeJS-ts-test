import { container } from "tsyringe";
import { OrderService, RoleService, UserService } from "../services";
import { ProductService } from "../services/product.service";

container.registerSingleton<RoleService>(RoleService);

container.registerSingleton<UserService>(UserService);

container.registerSingleton<OrderService>(OrderService);

container.registerSingleton<ProductService>(ProductService);