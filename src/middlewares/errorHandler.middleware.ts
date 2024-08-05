import { NextFunction, Request, Response } from "express";

export function errorHandler(error: any, _: Request, res: Response, next: NextFunction){
    console.error(error);
    return res.status(error.statusCode || 500).json({ message: error.message || 'Internal server error'});
};