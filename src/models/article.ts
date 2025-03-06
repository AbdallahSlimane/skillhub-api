import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: 'articles' })
export class Article {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ length: 255, name: "title" })
    title: string;

    @Column("text", { name: "content" })
    content: string;

    @Column("uuid", { name: "author_id" })
    author_id: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "author_id" })
    author: User;

    @Column("text", { array: true, default: "{}", name: "tags" })
    tags: string[];

    @Column({ default: 0, name: "upvotes" })
    upvotes: number;

    @Column({ default: 0, name: "downvotes" })
    downvotes: number;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", name: "created_at" })
    created_at: Date;

    constructor(title: string, content: string, author_id: string, author: User, tags: string[], upvotes: number, downvotes: number, created_at: Date) {
        this.id = uuidv4();
        this.title = title;
        this.content = content;
        this.author_id = author_id;
        this.author = author;
        this.tags = tags;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
        this.created_at = created_at;
    }
}
