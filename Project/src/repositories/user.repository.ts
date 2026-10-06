import { pool } from "../lib/db";
import { DBUserRow, DBUserWithPasswordRow, User } from "../types/user";


export async function findUserByEmail(email : string):Promise<User | null>{
    const result = await pool.query<DBUserRow>(
        "SELECT id ,email , role, created_at FROM users WHERE email = $1",[email]
    );
    return result.rows[0] ?? null;
}

export async function createUser(email : string,password : string):Promise<User>{
    const result = await pool.query<DBUserRow>(
        `INSERT INTO users (email,password_hash) VALUES ($1,$2) RETURNING id, email,role,created_at`,[email,password]
    );
    return result.rows[0];
}