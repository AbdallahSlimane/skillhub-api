import { Repository } from "typeorm";
import { Chatbot } from "../models/chatbot";
import { ShortArticleService } from "./short-article.service";
import { clearRequest, getWordAfterExpert } from "../functions/utils";
import { ArticleService } from "./article.service";
import { get } from "http";
import { UserService } from "./user.service";
import { User } from "../models/user";

export class ChatbotService {
    private chatbotRepository: Repository<Chatbot>;
    private userService: UserService;
    private promptMessage: string = "";

    constructor(chatbotRepository: Repository<Chatbot>, userService: UserService) {
        this.chatbotRepository = chatbotRepository;
        this.userService = userService;
    }

    public async postMessage(message: string, type: string): Promise<string> {
        if (type === "shortn") {
            this.promptMessage = "role\"user\" Synthétiser l'article en un paragraphe:";
        }
        
        if(message.includes("expert")){
            let wordSet : string = clearRequest(message).toString();
            let result: string = getWordAfterExpert(wordSet);
            let listUser = this.userService.findTop3ExpertsByDomain(result);
            this.promptMessage = "role\"user\" Voici les experts qui peuvent vous aider sur ce sujet : " + (await listUser).map(user => user.name).join(", ");
            return this.promptMessage;


        }
        
        /*else if (type === "start") {
            let wordSet: Set<string> = clearRequest(message);
            let results: Set<string> = this.getArticleByTags(wordSet);
            let finalMessage = getContentArticles(results);
            this.promptMessage = `Donne moi uniquement l'id et le nom de l'article qui se rapproche le plus de cette question : ${finalMessage} réponse se fera sous format { id: xxxxxxx, titre: "titre"} liste des articles :`;
        } else {
            this.promptMessage = "";
        }*/

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
                            content: content
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
            if(type === "shortn") {
                //this.shortArticleService.postShortArticle(data.choices[0].message.content.trim());
                return "";
            }
            return data.choices[0].message.content.trim();
        } catch (error: any) {
            throw new Error("Error posting message: " + error.message);
        }
    }
}
