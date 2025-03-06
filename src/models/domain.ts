import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from "typeorm";
import { Article } from "./article";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: 'domains' })
@Unique(["article_id", "name"])
export class Domain {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column("uuid", { name: "article_id" })
    article_id: string;

    @Column({ length: 100, name: "name" })
    name: string;

    @Column("text", { nullable: true, name: "description" })
    description: string;

    @ManyToOne(() => Article, { onDelete: "CASCADE" })
    @JoinColumn({ name: "article_id" })
    article: Article;

    constructor(article_id: string, name: string, description: string, article: Article) {
        this.id = uuidv4();
        this.article_id = article_id;
        this.name = name;
        this.description = description;
        this.article = article;
    }
}
