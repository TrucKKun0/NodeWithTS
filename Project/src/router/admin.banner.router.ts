import Router, { NextFunction, Request, Response } from  "express";
import { authenticate } from "../middleware/auth.middlerware";
import { requireAdmin } from "../middleware/admin.middleware";
import { uploadSingleBannerImage } from "../middleware/banner.middleware";
import { creatAdminBannerService, deleteAdminBannerService, fetchAllBanners } from "../services/admin.banner.service";


export const adminBannerRouter = Router();

adminBannerRouter.use(authenticate,requireAdmin);

adminBannerRouter.post("/",uploadSingleBannerImage,async(req,res,next)=>{
    try {
        const banner = await creatAdminBannerService(req.file);

        return res.status(201).json({
            success : true,
            data : {
                banner
            }
        })
    } catch (error) {
        next(error);
    }
});


adminBannerRouter.get("/",async(req:Request,res : Response, next : NextFunction)=>{
    try {
        const banners = await fetchAllBanners();
        return res.status(200).json({
            success : true,
            data : {banners}
        })
    } catch (error)  {
        next(error);
    }
});

adminBannerRouter.delete("/:bannerId",async(req , res , next ,)=>{
    try {
        await deleteAdminBannerService(req.params.bannerId);
        return res.status(200).json({
            success : true,
            message : "successfully deleted banner."
        })
    } catch (error) {
        next(error);
    }
})