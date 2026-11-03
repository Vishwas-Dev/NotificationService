import { NotificationDto } from '../dto/notification.dto.js';
import {mailerQueue} from '../queues/mailer.queue.js';

export const MAILER_PAYLOAD = "payload:mail";
export const addEmailToQueue = async (payload: NotificationDto) => 
    {
        await mailerQueue.add(MAILER_PAYLOAD, payload);      
        console.log(` ${JSON.stringify(payload)}` );      
    }

