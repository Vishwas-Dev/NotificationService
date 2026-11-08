import { Job, Worker } from "bullmq";
import { NotificationDto } from './../dto/notification.dto.js';
import { MAILER_QUEUE } from "../queues/mailer.queue.js";
import { getRedisConnObject } from "../config/redis.config.js";
import { MAILER_PAYLOAD } from "../producers/email.producer.js";
import { sendEmail } from "../services/mailer.service.js";
import { renderMailTemplate } from "../templates/template.hadnler.js";
import { logger } from "../config/logger.config.js";

export const setupMailerWorker = () => {
    const emailProcessor = new Worker<NotificationDto>(
        MAILER_QUEUE, // name of the queue
        async (job: Job) => {
             console.log("-----------------------------");
             console.log("WORKER PROCESSOR ENTERED:1");
             console.log("WORKER PROCESSOR ENTERED:2");
             console.log("WORKER PROCESSOR ENTERED:3");
            if (job.name !== MAILER_PAYLOAD) {
                throw new Error("Invalid job name");
            }
            // call the servie layer
            const payload = job.data;
            console.log(`Processing email job with payload: ${JSON.stringify(payload)}`);

            const emailContent = await renderMailTemplate(payload.templateId, payload.params);
            await sendEmail(payload.to, payload.subject, emailContent);
            logger.info(`Email sent to ${payload.to} with subject "${payload.subject}"`)

            
        }, // process func
        {
            connection: getRedisConnObject()
        }
    );

    emailProcessor.on("active", (job) => {
    console.log("ACTIVE EVENT:", job.id);
});

emailProcessor.on("error", (err) => {
    console.error("WORKER ERROR:", err);
});

// emailProcessor.on("failed", (job, err) => {
//     console.error("FAILED:", job?.id, err.message);
// });

// emailProcessor.on("completed", (job) => {
//     console.log("COMPLETED:", job.id);
// });

// emailProcessor.on("completed", (job) => {
//     console.log("COMPLETED:", job.id);
// });
    
   emailProcessor.on("failed", (job, err) => {
    logger.error(`Email job ${job?.id} failed: ${err.message}`);
});
  emailProcessor.on("completed", (job) => {
    console.log(`Email processing completed successfully: ${job.id}`);
});
}
