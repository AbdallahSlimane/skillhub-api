import {Column, Entity} from "typeorm";

@Entity({ name: "chatbots" })  // Le nom de la table peut être "chatbots"
export class Chatbot {
    @Column("text", { name: "message" })
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}