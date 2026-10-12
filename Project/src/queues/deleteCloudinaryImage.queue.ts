import { Queue } from "bullmq";
import { bullmqConnection } from "../lib/redis";
import { attempt } from "joi";


const QUEUE_NAME= "cloudinary-jobs";
const DELETE_CLOUDINARY_IMAGE_JOB = "delete-cloudinary-image";

type DeleteCloudinaryImageJobData={
    publicId : string
}

export const deleteClodinaryQueue = new Queue(
    QUEUE_NAME,
    {connection : bullmqConnection}
)

export async function  addDeleteCloudinaryIamageJob(publicId : string):Promise<void>{
        const jobData : DeleteCloudinaryImageJobData= {
            publicId
        }

        await deleteClodinaryQueue.add(DELETE_CLOUDINARY_IMAGE_JOB,jobData,
            {
                attempts : 3,
                backoff : {
                    type : 'exponential',
                    delay : 3000
                },
                removeOnComplete: true,
                removeOnFail : false
            },
            
        )
}