import { NextFunction, Request, Response } from "express";
import { User } from "../models";
import { UserService } from "../services";
import { container } from "tsyringe";
import { BadRequestError } from "../interfaces/error.classes";
import { comparePasswordHelper } from "../helpers/bcrypt.helper";

export class AuthController {
    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) throw new BadRequestError('All fields are required');

            const userService: UserService = container.resolve(UserService);
            const user: User = await userService.getUserByEmail(email);

            if (!user || !await comparePasswordHelper(password, user.password)) throw new BadRequestError( 'Invalid credentials');

            const token = await userService.generateToken({id: user.id, email: user.email, role: user.role});

            res.status(200).json({ message: 'User logged succesfully', token });
        } catch (error: any) {
            next(error);
        }
    }
}