import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../interfaces/error.classes';

export interface AuthRequest extends Request {
    user?: any;
}

export function jwtAuth(req: AuthRequest, res: Response, next: NextFunction): void {

    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedError('This resource needs authentication');

    jwt.verify(token, process.env.JWT_SECRET as string, (err: any, user: any) => {
        if (err) return res.status(401).json({ message: 'This resource needs authentication' });

        req.user = user;
        next();
    });


}

export function authorization(requiredPermission: string, entityId: number) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) return res.status(401).json({ message: 'This resource needs authentication' });

        const userPermission = req.user.permission;

        console.log(req.user);
        const entity = userPermission.find((permission: any) => permission.entityId === entityId);

        console.log(entity[requiredPermission]);
        if (!entity || !entity[requiredPermission]) return res.status(403).json({ message: 'Action is forbidden for this user' });

        next();
    };
}