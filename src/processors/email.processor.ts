import { Job, Worker } from "bullmq";
import { NotificationDto } from './../dto/notification.dto.js';
import { MAILER_QUEUE } from "../queues/mailer.queue.js";
import { getRedisConnObject } from "../config/redis.config.js";
import { MAILER_PAYLOAD } from "../producers/email.producer.js";

export const setupMailerWorker = ()=> {
     const emailProcessor = new Worker<NotificationDto> (
    MAILER_QUEUE, // name of the queue
    async (job: Job) =>{ 
        if(job.name !== MAILER_PAYLOAD) {
            throw new Error("Invalid job name");
        }
         // call the servie layer
            const payload = job.data;
            console.log(`Processing email job with payload: ${JSON.stringify(payload)}`);
    }, // process func
    {
       connection: getRedisConnObject()
    }
 ); 

 emailProcessor.on("failed", () => {
    console.error("email process failed");
 } );
 emailProcessor.on("completed", () => {
    console.error("email process completed succesfully");
 } );
}