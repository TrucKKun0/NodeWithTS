import { pool } from "../lib/db";
import { Task } from "../types/task";

type AdminTaskListFilters = {
    search ?: string;
    status ?: string;
}
type TaskRow = Task;

export async function findAllTasks(
    filters: AdminTaskListFilters
):Promise<Task[]>{
    const condition : string[] = [];
    const value : string[] = [];
    let paramIndex = 1;

    if (filters.search) {
        condition.push(`title ILIKE $${paramIndex}`);
        value.push(`%${filters.search}`);
        paramIndex++;
    }
    if(filters.status){
        condition.push(`status= ${paramIndex}`);
        value.push(filters.status);
    }
    const whereClause = condition.length > 0 ?`WHERE ${condition.join(" AND ")}` :"";
    const result = await pool.query<TaskRow>(`
        SELECT id , title , status, user_id, created_at, updated_at
        FROM support_tasks 
        ${whereClause}
        ORDER BY created_at DESC
        `,
        value);
        return result.rows;
}
