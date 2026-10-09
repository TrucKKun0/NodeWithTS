import { MAXIMUM_TITLE_LENGTH } from "../constants/task.constant";
import { AppError } from "../error/appError";
import { allTasks, createTask, getUserTask, updateUserTask, userTasks } from "../repositories/user.task.repository";
import { Task } from "../types/task";


function validateTitle (title : unknown):string{
    if(typeof(title)!== 'string' || !title.trim()){
        throw new AppError(400,"title is required");
    }
    const trimTitle = title.trim();
    if(trimTitle.length > MAXIMUM_TITLE_LENGTH){
        throw new AppError(400,"Title length must be 100 character or less")
    }
    return trimTitle;
}

export async function createUserTask(userId : string,title : unknown):Promise<Task>{
        const validTitle = validateTitle(title);
        return createTask(userId, validTitle);

}

export async function getAllTasks():Promise<Task[]>{
    return allTasks();
}

export async function getUserTasks(userId : string):Promise<Task[]>{
    return userTasks(userId);
}

export async  function getTaskUserById(taskId : string,userId : string): Promise<Task>{
    const task = await getUserTask(taskId,userId);
    if (!task ) {
        throw new AppError(404,'User task not found');
    }
    return task;
}

export async function updateTaskByUserId(taskId : string, userId : string,title : string): Promise<Task>{
    const validTitle = validateTitle(title)
    const updatedTask = await updateUserTask(taskId,userId,validTitle);
    if(!updatedTask){
        throw new AppError (404,"Task not found");
    }
    return updatedTask;
}