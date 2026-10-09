import { pool } from "../lib/db";
import { Task } from "../types/task";

type TaskRow = Task;

export async function createTask(userId: string, title : string):Promise<Task>{
    
    const result = await pool.query<TaskRow>(
        `
        INSERT INTO support_tasks (title , user_id,)
        VALUES ($1,$2)
        RETURNING id, title,status,user_id,created_at,updated_at
        `,[
            userId,title
        ]
    )
    return result.rows[0];
}

export async function allTasks():Promise<Task[]>{
    const result = await pool.query<TaskRow>(
        `
        SELECT id,title,status,user_id,created_at,updated_at FROM support_tasks
        `
    )
    return result.rows;
}

export async function userTasks(userId : string):Promise<Task[]>{
    const result = await pool.query<TaskRow>(
        `
        SELECT * FROM support_tasks 
        WHERE user_id = $1
        `,[userId]
    );
    return result.rows;
}

export async function getUserTask(taskId : string, userId : string): Promise<Task | null>{
    const result = await pool.query<TaskRow>( 
        `SELECT * FROM support_tasks 
        WHERE id = $1 AND user_id = $2`,[taskId,userId]
    );
    return result.rows[0] ?? null;
}

export async function updateUserTask(taskId : string , userId : string, title : string): Promise<Task | null>{
    const result = await pool.query<TaskRow>(
        `
        UPDATE support_tasks 
        SET title = $1, updated_at = NOW()
        WHERE id = $2 AND user_id = $3
        RETURNING id, title, status , user_id, created_at, updated_at
        `,[title,taskId,userId]
    );
    return result.rows[0] ?? null;

}

export async function deleteTask(taskId : string, userId : string):Promise<boolean>{
    const result = await pool.query<TaskRow>(
        `
        DELETE FROM support_tasks 
        WHERE id = $1 AND user_id = $2
        RETURNING id , tittle, status, user_id, created_at, updated_at
        `,[taskId,userId]
    );
    return (result.rowCount ?? 0) > 0;
}