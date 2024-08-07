import { container } from "tsyringe";
import { RoleService } from "../services/role.service";
import { BadRequestError, NotFoundError } from "../interfaces/error.classes";
import { NextFunction, Request, Response } from "express";

export class RoleController {

    static async getAllRoles(_: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roleService: RoleService = container.resolve(RoleService);

            const roles = await roleService.getAllRoles();

            if (!roles.length) throw new NotFoundError("No roles were found");

            res.status(200).json({ message: 'Roles fetched succesfully', data: roles });
        } catch (error: any) {
            
            next(error);
        }
    }

    static async createRole(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const roleService: RoleService = container.resolve(RoleService);

            const { name } = req.body;

            if(!name) throw new BadRequestError('Name is required');

            const newRole = await roleService.createRole(req.body);

            res.status(201).json({ message: 'Role created succesfully', data: newRole });
        } catch (error: any) {
            next(error);
        }
    }
}