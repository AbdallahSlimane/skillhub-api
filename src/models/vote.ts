import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Article } from "./article";

@Entity({ name: "votes" })
export class Vote {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @Column({ name: "article_id" })
    articleId: string;

    @ManyToOne(() => Article, { onDelete: "CASCADE" })
    @JoinColumn({ name: "article_id" })
    article: Article;

    @Column({ name: "vote_value" })
    voteValue: number;

    @CreateDateColumn({
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    })
    createdAt: Date;


    constructor(userId: string, articleId: string, article: Article, voteValue: number, createdAt: Date) {
        this.id = uuidv4();
        this.userId = userId;
        this.articleId = articleId;
        this.article = article;
        this.voteValue = voteValue;
        this.createdAt = createdAt;
    }
}
