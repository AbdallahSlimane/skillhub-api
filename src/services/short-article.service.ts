import { Repository } from "typeorm";
import { ShortArticle } from "../models/short-article";

export class ShortArticleService {
    private shortArticleRepository: Repository<ShortArticle>;

    constructor(shortArticleRepository: Repository<ShortArticle>) {
        this.shortArticleRepository = shortArticleRepository;
    }

    public async postShortArticle(shortArticle: ShortArticle): Promise<ShortArticle> {
        try {
            return await this.shortArticleRepository.save(shortArticle);
        } catch (error: any) {
            throw new Error("Error posting short article: " + error.message);
        }
    }

    public async getShortArticle(id: string): Promise<ShortArticle | null> {
        try {
            return await this.shortArticleRepository.findOne({ where: { articleId: id } });
        } catch (error: any) {
            throw new Error("Error fetching short article with this id: " + error.message);
        }
    }
}