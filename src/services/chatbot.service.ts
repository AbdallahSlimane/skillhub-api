import { Repository } from "typeorm";
import { Chatbot } from "../models/chatbot";

export class ChatbotService {
    private chatbotRepository: Repository<Chatbot>;
    private promptMessage: string = "";

    constructor(chatbotRepository: Repository<Chatbot>) {
        this.chatbotRepository = chatbotRepository;
    }

    public async postMessage(message: string, type: string, history: string = ""): Promise<string> {
        if (type === "shortn") {
            this.promptMessage = "role\"user\" Synthétiser l'article en un paragraphe:"; // TODO Add article
        } else if (type === "start") {
            this.promptMessage = `Donne moi uniquement l'id et le nom de l'article qui se rapproche le plus de cette question : ${message} réponse se fera sous format { id: xxxxxxx, titre: "titre"} liste des articles :`;
            // TODO get 3 articles
        } else {
            this.promptMessage = "";
        }
        try {
            const content = this.promptMessage === "" ? message : this.promptMessage;
            const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.API_KEY}`
                },
                body: JSON.stringify({
                    model: "mistral-small-latest",
                    messages: [
                        {
                            role: "user",
                            content: history + content
                        }
                    ],
                    temperature: 0.7,
                    max_tokens: 150
                })
            });


            if (!response.ok) {
                throw new Error(`MistralAI request failed with status ${response.body}`);
            }

            const data = await response.json();
            return data.choices[0].message.content.trim();
        } catch (error: any) {
            throw new Error("Error posting message: " + error.message);
        }
    }
}
