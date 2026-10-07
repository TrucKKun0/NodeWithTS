import dotenv from "dotenv";

dotenv.config();

function checkEnvVariables(key: string):string{
    const value = process.env[key]
    if(!value){
        throw new Error(`Missing env variable for ${key}`);
    }
    return value;
}

export const env = {
    port : Number(process.env.PORT) ?? 3000,
    isProduction : (process.env.NODE_ENV ?? "development") === "production",
    nodeEnv : process.env.NODE_ENV ?? "development",
    loglevel : process.env.LOG_LEVEL ?? "info",
    databaseurl : checkEnvVariables("DATABASE_URL"),
    jwtAccessSecret : checkEnvVariables("JWT_SECRET"),
    jwtAccessExpiresIn : checkEnvVariables("JWT_ACCESS_EXPIRES_IN")
} as const;
