import { Repository } from "typeorm";
import { Chatbot } from "../models/chatbot";

export class ChatbotService {
    private chatbotRepository: Repository<Chatbot>;
    private promptMessage: string = "";

    constructor(chatbotRepository: Repository<Chatbot>) {
        this.chatbotRepository = chatbotRepository;
    }

    public async postMessage(message: string, type: string): Promise<string> {
        if (type === "shortn") {
            this.promptMessage = "Synthétiser l'article en un paragraphe:";
        } else if (type === "chatBot") {
            this.promptMessage = "";
        } else {
            this.promptMessage = "";
        }

        try {
            const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.API_KEY}`
                },
                body: JSON.stringify({
                    prompt: `${this.promptMessage}\n\n${message}`
                })
            });

            if (!response.ok) {
                throw new Error(`MistralAI request failed with status ${response.status}`);
            }

            const data = await response.json();
            return await this.chatbotRepository.save(data.summary);
        } catch (error: any) {
            throw new Error("Error posting message: " + error.message);
        }
    }
}
