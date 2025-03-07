import { Repository } from "typeorm";
import { Domain } from "../models/domain";
import { Article } from "../models/article";

export class DomainService {
    private domainRepository: Repository<Domain>;

    constructor(domainRepository: Repository<Domain>) {
        this.domainRepository = domainRepository;
    }

    public async createDomain(article: Article, domainName: string, description: string = ""): Promise<Domain> {
        try {
            const domain = new Domain(article.id, domainName, description, article);
            return await this.domainRepository.save(domain);
        } catch (error: any) {
            throw new Error("Error creating domain: " + error.message);
        }
    }
}
