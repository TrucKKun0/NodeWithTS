import Router from "express";
import { registerUser } from "../services/auth.service";

export const authRouter = Router();

authRouter.post("/register",async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        await registerUser(email,password);
        res.status(200).json({
            success : true,
            message:`User registration completed. Please login to continue`
        })

    } catch (error) {
        next(error);
    }
})