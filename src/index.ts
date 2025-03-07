import "reflect-metadata";
import express from "express";
import { config } from "dotenv";
import cors from 'cors';
import {db, initialize_typeorm} from "./data-source/data-source";
import {userRouter, articleRouter, voteRouter, chatbotRouter} from "./routes/routes";

config();

const PORT = process.env.APP_PORT || 3000;

export async function startServer() {
    try {
        const app = express();
        app.use(express.json());

        app.use(cors());
        app.use(cors({ origin: 'http://localhost:3000' }));

        app.use('/user', userRouter);
        app.use('/article', articleRouter);
        app.use('/vote', voteRouter);
        app.use('/chatbot', chatbotRouter);

        await initialize_typeorm(db);
        console.log("Database connected successfully");

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}/`);
        });

    } catch (error) {
        console.error("Error starting the server:", error);
    }
}

startServer().catch((error) => console.error("Unexpected error:", error));