import { MINIMUM_PASSWORD_LENGTH, SALT_HASH_LENGTH } from "../constants/auth.constant";
import { AppError } from "../error/appError";
import { getGoogleAuthUrl, getGoogleUserFromAuthCode } from "../lib/google";
import { signAccessToken } from "../lib/jwt";
import {createGoogleUser, createUser, findUserByEmail, findUserByEmailWithPassword, findUserByGoogleId, linkGoogleIdToUser} from "../repositories/user.repository"
import bcrypt from "bcrypt";
import { User } from "../types/user";

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

export function startGoogleLogin():string{
    return getGoogleAuthUrl();
}

function createAccessTokenForUser(user: User):string{
    return signAccessToken({
        userId : user.id,
        email : user.email,
        role : user.role
    })
}

export async function loginWithGoogle(code:string):Promise<{accessToken : string}> {
    const googleProfile = await getGoogleUserFromAuthCode(code);
    let user = await findUserByGoogleId(googleProfile.googleId);
    if(!user){
        user = await findUserByEmail(googleProfile.email);
        if(user){
            user = await linkGoogleIdToUser(user.id,googleProfile.googleId);

        }else{
            user = await createGoogleUser(googleProfile.email,googleProfile.googleId);
        }
    }
    const accessToken = createAccessTokenForUser(user);

    return {accessToken};
}