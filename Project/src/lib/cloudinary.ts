import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env";
import { AppError } from "../error/appError";

type UploadResult = {
    secureUrl : string;
    publicId : string;
}

export async function uploadBannerImageToCloudinary(
    buffer : Buffer,
    options?:{folder ?: string}
):Promise<UploadResult>{
    const cloudName = env.cloudinaryCloudName;
    const apiKey = env.cloudinaryApiKey;
    const apiSecret = env.cloudinaryApiSecret;
    if(!cloudName || !apiKey || !apiSecret){
        throw new AppError(500,"Cloudinary not configured properly");
    }

    cloudinary.config({
        cloud_name : cloudName,
        api_key : apiKey,
        api_secret : apiSecret
    });

    return new Promise((reslove,reject)=>{
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type : "image",
                folder : options?.folder
            },
            (error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                reslove({
                    secureUrl : result?.secure_url ?? "",
                    publicId : result?.public_id ?? ""
                })
            }
        )
        //sending raw buffer to cloudinary
        uploadStream.end(buffer);
    })
}