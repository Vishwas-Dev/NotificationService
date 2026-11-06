import nodemailer from 'nodemailer';
import { serverConfig } from './index.js';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: serverConfig.MAIL_USER,
        pass: serverConfig.MAIL_PASS,
    },
});
transporter.verify()
    .then(() => {
        console.log("Gmail SMTP connection successful");
    })
    .catch((error) => {
        console.error("Gmail SMTP connection failed:", error);
    });

export default transporter;