import { Request, Response } from "express";
import { ShortArticleService } from "../services/short-article.service";
import { ShortArticle } from "../models/short-article";

export class ShortArticleController {
    constructor(
        private shortArticleService: ShortArticleService
    ) {}
    
    public async postShortArticle(req: Request, res: Response): Promise<void> {
        const { articleId, shortContent} = req.body;
        try {
            const shortArticle: ShortArticle = new ShortArticle(articleId, shortContent);
            const createdShortArticle = await this.shortArticleService.postShortArticle(shortArticle);
            res.status(201).json(createdShortArticle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getShortArticle(req: Request, res: Response): Promise<void> {
        const articleId = req.params.id;
        try {
            const shortArticle = await this.shortArticleService.getShortArticle(articleId);
            if (!shortArticle) {
                res.status(404).json({ error: "Short article not found" });
                return;
            }
            res.status(200).json(shortArticle);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}