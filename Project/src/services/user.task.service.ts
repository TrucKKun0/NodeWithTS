import { MAXIMUM_TITLE_LENGTH } from "../constants/task.constant";
import { AppError } from "../error/appError";
import { createTask } from "../repositories/user.task.repository";
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