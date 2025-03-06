import { DataSource } from "typeorm";
import { config } from 'dotenv';

config();

export const db = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: false,
    synchronize: false,
    logging: false,
    entities: ['dist/models/*.js'],
    subscribers: [],
    migrations: [],
});

export async function initialize_typeorm(db: DataSource) {
    try {
        await db.initialize();
        console.log("Data Source has been initialized!");
    } catch (err) {
        console.error("Error during Data Source initialization:", err);
    }
}