import { IPermission } from "./permission.interfaces";
import { IRole } from "./role.interfaces";

export interface ICreateUser {
    email: string;
    password: string;
    roleId?: number;
}

export interface IUpdateUser extends Partial<ICreateUser>{}

export interface IUserWithPermission extends Partial<ICreateUser>{
    role?: IRole,
    permission: IPermission[]
}
