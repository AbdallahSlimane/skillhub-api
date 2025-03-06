import {Repository} from "typeorm";
import {Article} from "../models/article";

export class ArticleService {
    private articleRepository: Repository<Article>


    constructor(articleRepository: Repository<Article>) {
        this.articleRepository = articleRepository;
    }

    public async findAll(): Promise<Article[]> {
        try {
            return await this.articleRepository.find();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching all articles: " + error.message);
            }
            throw new Error('Error fetching all articles');
        }
    }

    private async findById(id: string): Promise<Article | null> {
        try {
            return await this.articleRepository.findOne(
                {where: {id: id}}
            );
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching article with this id: " + error.message);
            }
            throw new Error('Error fetching article with this id');
        }
    }

    private async createArticle(article: Article): Promise<Article> {
        try {
            return await this.articleRepository.save(article)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Article creation unknown error: " + error.message);
            }
            throw new Error('Article creation error');
        }
    }

    private async updateArticle(article: Article): Promise<Article> {
        try {
            return await this.articleRepository.save(article)
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Article update unknown error: " + error.message);
            }
            throw new Error('Article update error');
        }
    }

    private async findByByDomain(domainId: string): Promise<Article[]> {
        try {
            return await this.articleRepository
                .createQueryBuilder("article")
                .innerJoin("domains", "domain", "domain.article_id = article.id")
                .where("domain.id = :domainId", { domainId })
                .getMany();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching articles for this domain: " + error.message);
            }
            throw new Error("Error fetching articles for the domain");
        }
    }

    private async findByTag(tag: string): Promise<Article[]> {
        try {
            return await this.articleRepository
                .createQueryBuilder("article")
                .where(":tag = ANY(article.tags)", { tag })
                .getMany();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching articles for this tag: " + error.message);
            }
            throw new Error("Error fetching articles by tag");
        }
    }

    public async deleteArticle(articleId: string, userId: string): Promise<void> {
        try {
            const article = await this.findById(articleId);
            if (!article) {
                throw new Error("Article not found");
            }
            if (article.author_id !== userId) {
                throw new Error("Unauthorized: You are not the author of this article");
            }
            await this.articleRepository.delete(articleId);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error deleting article: " + error.message);
            }
            throw new Error("Error deleting article");
        }
    }
}