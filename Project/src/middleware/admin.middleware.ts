import {Request,Response,NextFunction} from "express";
import { AppError } from "../error/appError";

export function requireAdmin(req : Request, _res : Response , next : NextFunction): void {
    if (req.user?.role !== "ADMIN") {
        next(new AppError(403,"You dont have access to this page."));
        return;
    }
    next();
}