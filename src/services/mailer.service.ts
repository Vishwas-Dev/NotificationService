import { serverConfig } from "../config/index.js";
import transporter from "../config/mailer.config.js";
import { logger } from "../config/logger.config.js";
// import { internalServerError } from "../utilis/error/app.error.js";

// export async function sendEmail(to: string, subject: string, body: string) {
    
//     try {
//         await transporter.sendMail({
//             from: serverConfig.MAIL_USER,
//             to,
//             subject,
//             html: body,
        
//         });
//         logger.info(`Email sent to ${to} with subject ${subject}`)
//     } catch (error) {
//     console.error("ORIGINAL EMAIL ERROR:", error);
//     throw error;
// }
// }           
   export async function sendEmail(
    to: string,
    subject: string,
    body: string
): Promise<void> {
    try {
        console.log("1. Starting email delivery...");

        const info = await transporter.sendMail({
            from: serverConfig.MAIL_USER,
            to,
            subject,
            html: body,
        });

        console.log("2. SMTP RESULT:", info);

        console.log("3. Accepted:", info.accepted);
        console.log("4. Rejected:", info.rejected);
        console.log("5. Message ID:", info.messageId);

        logger.info(`Email sent to ${to} with subject ${subject}`);

    } catch (error) {
        console.error("ORIGINAL EMAIL ERROR:", error);
        throw error;
    }
}