import nodemailer from 'nodemailer';
import { serverConfig } from './index.js';

 const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: serverConfig.MAIL_USER,
        pass: serverConfig.MAIL_PASS,
    }
})

export default transporter;