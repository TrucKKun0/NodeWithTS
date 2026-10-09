
import { NextFunction, Request, Response, Router } from 'express';
import { authenticate } from '../middleware/auth.middlerware';
import { createUserTask, getAllTasks, getTaskUserById, getUserTasks, updateTaskByUserId } from '../services/user.task.service';
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
});

userTaskRouter.get('/',async(req : Request,res : Response,next : NextFunction)=>{
        try {
            const tasks = await getAllTasks();
        } catch (error) {
            next(error);
        }
});

userTaskRouter.get('/me/',authenticate,async(req: Request,res: Response,next : NextFunction)=>{
    try {
        const userId = req.user?.userId;
        if(!userId){
            next(new AppError(403,"Access denied"));
            return;
        }
        const userTaks = await getUserTasks(userId);
        return res.status(200).json({
            success : true,
            data : userTaks
        })
    } catch (error) {
        next(error);
    }
})

userTaskRouter.get('/:taskId',authenticate,async(req: Request, res : Response ,next: NextFunction)=>{
    try {
        const taskId = String(req.params.taskId);
        
        const userId = req.user?.userId;
        if(!userId){
            next(new AppError(403,"No access token provided."));
            return;
        }
        const task = await getTaskUserById(taskId,userId);
        res.status(200).json({
            success : true,
            data : task
        })

        
    } catch (error) {
        next(error);
    }
});

userTaskRouter.patch("/:taskId",authenticate,async(req: Request,res : Response,next : NextFunction)=>{
    try {
        const taskId = String(req.params.taskId);
        const userId = req.user?.userId;
        if(!userId){
            next(new AppError(403,"No access token provided."));
            return;
        }
        const title = req.body.title;

        const updatedTask = await updateTaskByUserId(taskId,userId,title);
        return res.status(201).json({
            success : true,
            data : updatedTask
        })
    } catch (error) {
        next(error);
    }
})