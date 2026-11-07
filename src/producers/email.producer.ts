import { NotificationDto } from '../dto/notification.dto.js';
import { mailerQueue } from '../queues/mailer.queue.js';

export const MAILER_PAYLOAD = "payload:mail";
export const addEmailToQueue = async (payload: NotificationDto) => {
    await mailerQueue.add(MAILER_PAYLOAD, payload);
    console.log(`Email added to queue with payload: ${JSON.stringify(payload)}`);
    // const job = await mailerQueue.add(MAILER_PAYLOAD, payload);
    // console.log("Job added:", job.id);
    // console.log("State:", await job.getState());

    // console.log("Waiting:", await mailerQueue.getWaitingCount());

    // console.log("Active:", await mailerQueue.getActiveCount());
    
    // console.log("Completed:", await mailerQueue.getCompletedCount());
    // console.log("Failed:", await mailerQueue.getFailedCount()); 


}

