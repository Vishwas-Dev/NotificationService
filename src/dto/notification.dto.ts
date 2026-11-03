export interface NotificationDto {
    to: string; // The recipient's email address    
    subject: string; // The subject of the email
    templateId: string; // The ID of the email template to be used for sending the notification
    params: Record<string, any>; // An object containing key-value pairs for dynamic content in the email template
}
