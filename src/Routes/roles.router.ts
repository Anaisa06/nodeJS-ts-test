import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

export const rolesRouter: Router = Router();

rolesRouter.get('/', RoleController.getAllRoles);
rolesRouter.post('/', RoleController.createRole);