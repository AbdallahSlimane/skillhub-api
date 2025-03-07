import {Column, Entity} from "typeorm";

export class Chatbot {
    @Column("text", { name: "message" })
    message: string;

    constructor(message: string) {
        this.message = message;
    }
}