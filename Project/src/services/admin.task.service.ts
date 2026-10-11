import { AppError } from "../error/appError";
import { findAllTasks, updateTaskStatus } from "../repositories/admin.task.repository";

import { Task } from "../types/task";


type AdminTaskListQuery = {
    search?: string;
    status?: string;
}

type AdminTaskListResponse = {
    tasks : Task[]
}
const TASK_STATUS =  ["OPEN","IN_PROGRESS","RESOLVED"] as const;
type TaskStatus = (typeof TASK_STATUS)[number];

export async function getAllTasks(query : AdminTaskListQuery): Promise<AdminTaskListResponse>{
    const search = query.search?.trim() || undefined;
    const status = query.status?.trim() || undefined;

    if(status && !TASK_STATUS.includes(status as TaskStatus)){
        throw new AppError(400,"Status must be open, in progress or resolved");
    }
    const tasks = await findAllTasks({
        search,
        status
    });

    return {
        tasks
    }

}

export async function updateAdminTaskStatus(taskId : string, status : unknown):Promise<Task>{
    if (typeof status != 'string' || !TASK_STATUS.includes(status as TaskStatus) ) {
        throw new AppError(400,"status must be between open,in_progress or resloved");
    }
    const task = await updateTaskStatus(taskId,status);
    if(!task){
        throw new AppError(404,"No task found");
    }
    return task
}