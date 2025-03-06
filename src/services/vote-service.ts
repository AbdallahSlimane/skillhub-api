import { Repository } from "typeorm";
import { Vote } from "../models/vote";
import { Article } from "../models/article";

export class VoteService {
    private voteRepository: Repository<Vote>;
    private articleRepository: Repository<Article>;

    constructor(voteRepository: Repository<Vote>, articleRepository: Repository<Article>) {
        this.voteRepository = voteRepository;
        this.articleRepository = articleRepository;
    }

    public async upvote(userId: string, articleId: string): Promise<Vote> {
        try {
            const article = await this.articleRepository.findOne({ where: { id: articleId } });
            if (!article) {
                throw new Error("Article not found");
            }

            // add a check to avoid multiple votes from the same user
            const existingVote = await this.voteRepository.findOne({ where: { userId, articleId } });
            if (existingVote) {
                if (existingVote.voteValue === 1) {
                    throw new Error("You have already voted positively on this article");
                } else {
                    article.downvotes = Math.max(article.downvotes - 1, 0);
                    article.upvotes += 1;
                    existingVote.voteValue = 1;
                    const updatedVote = await this.voteRepository.save(existingVote);
                    await this.articleRepository.save(article);
                    return updatedVote;
                }
            } else {
                const vote = new Vote(userId, articleId, article, 1, new Date());
                const savedVote = await this.voteRepository.save(vote);
                article.upvotes += 1;
                await this.articleRepository.save(article);
                return savedVote;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Unknown error during upvote: " + error.message);
            }
            throw new Error("Error during upvote");
        }
    }

    public async downvote(userId: string, articleId: string): Promise<Vote> {
        try {
            const article = await this.articleRepository.findOne({ where: { id: articleId } });
            if (!article) {
                throw new Error("Article not found");
            }

            // add a check to avoid multiple votes from the same user
            const existingVote = await this.voteRepository.findOne({ where: { userId, articleId } });
            if (existingVote) {
                if (existingVote.voteValue === -1) {
                    throw new Error("You have already voted against this article");
                } else {
                    article.upvotes = Math.max(article.upvotes - 1, 0);
                    article.downvotes += 1;
                    existingVote.voteValue = -1;
                    const updatedVote = await this.voteRepository.save(existingVote);
                    await this.articleRepository.save(article);
                    return updatedVote;
                }
            } else {
                const vote = new Vote(userId, articleId, article, -1, new Date());
                const savedVote = await this.voteRepository.save(vote);
                article.downvotes += 1;
                await this.articleRepository.save(article);
                return savedVote;
            }
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Unknown error during downvote: " + error.message);
            }
            throw new Error("Error during downvote");
        }
    }

    public async findVotesByArticle(articleId: string): Promise<Vote[]> {
        try {
            return await this.voteRepository.find({ where: { articleId: articleId } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching votes for this article: " + error.message);
            }
            throw new Error("Error retrieving votes");
        }
    }
}