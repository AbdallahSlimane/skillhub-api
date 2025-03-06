import { Request, Response } from "express";
import { VoteService } from "../services/vote.service";

export class VoteController {
    constructor(private voteService: VoteService) {}

    public async upvote(req: Request, res: Response): Promise<void> {
        const { userId, articleId } = req.body;
        try {
            const vote = await this.voteService.upvote(userId, articleId);
            res.status(200).json(vote);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async downvote(req: Request, res: Response): Promise<void> {
        const { userId, articleId } = req.body;
        try {
            const vote = await this.voteService.downvote(userId, articleId);
            res.status(200).json(vote);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getVotesByArticle(req: Request, res: Response): Promise<void> {
        const articleId = req.params.articleId;
        try {
            const votes = await this.voteService.findVotesByArticle(articleId);
            res.status(200).json(votes);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}