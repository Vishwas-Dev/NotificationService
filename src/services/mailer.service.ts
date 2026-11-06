import { serverConfig } from "../config/index.js";
import transporter from "../config/mailer.config.js";
import { logger } from "../config/logger.config.js";
import { internalServerError } from "../utilis/error/app.error.js";

export async function sendEmail(to: string, subject: string, body: string) {
    try {
        await transporter.sendMail({
            from: serverConfig.MAIL_USER,
            to,
            subject,
            html: body,
        });
        logger.info(`Email sent to ${to} with subject ${subject}`)
    } catch (error) {
            throw new internalServerError("failed to send email")
    }
} 