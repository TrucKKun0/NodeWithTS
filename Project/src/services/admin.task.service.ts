import { AppError } from "../error/appError";
import { findAllTasks } from "../repositories/admin.task.repository";

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