import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: "short_articles" })
export class ShortArticle {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("uuid", { name: "article_id" })
    articleId: string;

    @Column("text", { name: "short_content" })
    shortContent: string;

    constructor(articleId: string, shortContent: string) {
        this.id = uuidv4();
        this.articleId = articleId;
        this.shortContent = shortContent;
    }
}
