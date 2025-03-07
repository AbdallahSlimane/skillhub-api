import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { DomainService } from "../services/domain.service";
import { Article } from "../models/article";

export class ArticleController {
    constructor(
        private articleService: ArticleService,
        private userService: UserService,
        private domainService: DomainService
    ) {}

    public async createArticle(req: Request, res: Response): Promise<void> {
        const { title, content, author_id, tags, domainName, domainDescription } = req.body;
        try {
            const user = await this.userService.findById(author_id);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            const article: Article = new Article(
                title,
                content,
                author_id,
                user,
                tags,
                0,
                0,
                new Date()
            );
            const createdArticle = await this.articleService.createArticle(article);

            let createdDomain = null;
            if (domainName) {
                createdDomain = await this.domainService.createDomain(
                    createdArticle,
                    domainName,
                    domainDescription || ""
                );
            }

            res.status(201).json({ article: createdArticle, domain: createdDomain });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getArticles(req: Request, res: Response): Promise<void> {
        const topic = req.query.topic as string;
        try {
            let articles: Article[];
            if (topic) {
                articles = await this.articleService.findByByDomain(topic);
            } else {
                articles = await this.articleService.findAll();
            }
            res.status(200).json(articles);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getArticle(req: Request, res: Response): Promise<void> {
        const articleId = req.params.id;
        try {
            const article = await this.articleService.findById(articleId);
            if (!article) {
                res.status(404).json({ error: "Article not found" });
                return;
            }
            res.status(200).json(article);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateArticle(req: Request, res: Response): Promise<void> {
        const articleId = req.params.id;
        const { title, content, tags } = req.body;
        try {
            let article = await this.articleService.findById(articleId);
            if (!article) {
                res.status(404).json({ error: "Article not found" });
                return;
            }
            article.title = title || article.title;
            article.content = content || article.content;
            article.tags = tags || article.tags;
            const updatedArticle = await this.articleService.updateArticle(article);
            res.status(200).json(updatedArticle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async deleteArticle(req: Request, res: Response): Promise<void> {
        const articleId = req.params.id;
        const userId = req.body.userId;
        try {
            await this.articleService.deleteArticle(articleId, userId);
            res.status(200).json({ message: "Article deleted successfully" });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}
