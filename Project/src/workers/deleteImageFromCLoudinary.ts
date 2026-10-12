import { Job, Worker } from "bullmq";
import { deleteBannerFromCloudinary } from "../lib/cloudinary";
import { bullmqConnection } from "../lib/redis";
import { logger } from "../lib/logger";
import { error } from "node:console";

const QUEUE_NAME= "cloudinary-jobs";
const DELETE_CLOUDINARY_IMAGE_JOB = "delete-cloudinary-image";
type DeleteCloudinaryImageJobData={
    publicId : string
};

export const deleteCloudinaryImageWorker = new Worker(
    QUEUE_NAME,
    async (job)=>{
        if(job.name !== DELETE_CLOUDINARY_IMAGE_JOB){
            return;
        }
        const data = job.data as DeleteCloudinaryImageJobData;
        await deleteBannerFromCloudinary(data.publicId);
    },{
        connection : bullmqConnection
    }
);

deleteCloudinaryImageWorker.on("completed",(job)=>{
    logger.info(`Cloudinary data deleted with id ${job.id}`)
});

deleteCloudinaryImageWorker.on("failed",(job,error)=>{
    logger.error(
         {
            err : error.message
         },
         "cloudinary deletion failed"
    )
});

logger.info("Delete cloudinary image started");