import { AppError } from "../error/appError";
import { uploadBannerImageToCloudinary } from "../lib/cloudinary";
import { createAdminBanner, fetchAllAdminBanners } from "../repositories/admin.banner.repository";
import { Banner } from "../types/banner";


export async function creatAdminBannerService(file:Express.Multer.File | undefined):Promise<Banner> {
    if(!file){
        throw new AppError(400,"Image is required");
    }
    if(!file.buffer){
        throw new AppError(400,"Image type is invalid");
    }

    const {secureUrl, publicId} = await uploadBannerImageToCloudinary(
        file.buffer,
        {
            folder:"nodejs-capstone-project"
        }
    )
    if (!secureUrl || !publicId) {
        throw new AppError(500,"Cloudinary error");
    }

    const banner = await createAdminBanner(secureUrl,publicId);
    return banner;
}

export async function fetchAllBanners():Promise<Banner[]> {
    const banners = await fetchAllAdminBanners();
    if (!banners) {
        throw new AppError(404,"No banners found");
    }
    return banners;
}