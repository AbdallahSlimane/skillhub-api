import {ChatbotService} from "../services/chatbot.service";
import {Request, Response} from "express";

export class ChatbotController {
    constructor(
        private chatbotService: ChatbotService
    ) {
    }

    public async createMessage(req: Request, res: Response): Promise<void> {
        const { message, type } = req.body;
        try {
            const result = await this.chatbotService.postMessage(message, type);
            res.status(200).json({ summary: result });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}