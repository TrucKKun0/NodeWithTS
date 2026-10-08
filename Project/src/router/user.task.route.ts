
import { NextFunction, Request, Response, Router } from 'express';
import { authenticate } from '../middleware/auth.middlerware';
import { createUserTask } from '../services/user.task.service';
import { AppError } from '../error/appError';

export const userTaskRouter = Router();

userTaskRouter.post("/",authenticate,async (req : Request, res: Response, next : NextFunction)=>{
    try {
        const userId = req.user?.userId;
        if(!userId){
            next(new AppError(403,"No user Token avaiable"));
            return;
        }
        const {title} = req.body;

        const task = await createUserTask(userId,title);
        return res.status(201).json({
            success : true,
            data : task
        })
    } catch (error) {
        next(error);
    }
})