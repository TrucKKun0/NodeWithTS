import { Router } from 'express';
import { authenticate } from '../middleware/auth.middlerware';
import { requireAdmin } from '../middleware/admin.middleware';
import { getAllTasks } from '../services/admin.task.service';

export const adminTaskRouter = Router();

adminTaskRouter.use(authenticate,requireAdmin);

adminTaskRouter.get('/',async(req,res,next)=>{
    try {
        const allTasks = await getAllTasks(req.query);
        return res.status(200).json({
            success : true,
            data : {
                allTasks
            }
        })
    } catch (error) {
        next(error);
    }
})