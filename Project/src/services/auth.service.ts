import { MINIMUM_PASSWORD_LENGTH, SALT_HASH_LENGTH } from "../constants/auth.constant";
import { AppError } from "../error/appError";
import { signAccessToken } from "../lib/jwt";
import {createUser, findUserByEmail, findUserByEmailWithPassword} from "../repositories/user.repository"
import bcrypt from "bcrypt";

export async function registerUser(email : string, password : string): Promise<void>{

        if(!email || !password){
            throw new AppError(400,"Email and password is required");
        }

        if(password.length < MINIMUM_PASSWORD_LENGTH){
            throw new AppError(400,"Password must be of length 6 or more character");
        }
        const normalizedEmail = email.toLowerCase().trim();
        
        const existingUser = await findUserByEmail(normalizedEmail);

        if(existingUser){
            throw new AppError(409,`User is already registred with ${normalizedEmail}`);
        }

        const passwordHash = await bcrypt.hash(password,SALT_HASH_LENGTH);

        await createUser(normalizedEmail,passwordHash);
}

export async function loginUser(email : string, password : string): Promise<{accessToken : string}>{
    if (!email || ! password) {
        throw new AppError(400,"Email and password is required");
    }
    const normalizedEmail = email.toLowerCase().trim();
    const user = await findUserByEmailWithPassword(normalizedEmail,password);

    if (!user.password_hash) {
        throw new AppError(401,"Incorrect email or password");
    }
    const isPasswordValid = await bcrypt.compare(password,user.password_hash);
    if (!isPasswordValid) {
        throw new AppError(401,"Incorrect email or password");
    }
    const accessToken = signAccessToken({
        userId : user.id,
        email : user.email,
        role : user.role
    });
    return {accessToken}
}