import  fs  from "fs/promises";
import Handlebars from "handlebars";
import path from "path";
import { internalServerError } from "../utilis/error/app.error.js";


export async function renderMailTemplate(templateId: string, params:Record<string, any>) : Promise<string> {
    const templatePath = path.join(__dirname, "mailer", `${templateId}.hbs`);

    try {
        const content = await fs.readFile(templatePath, 'utf-8');
        const finalTemplate = Handlebars.compile(content);
        return finalTemplate(params);
    } catch (error) {
        throw new internalServerError(`template not found ${templateId}`);
    }
    
}