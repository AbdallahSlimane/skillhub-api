import {Repository} from "typeorm";
import {User} from "../models/user";

export class UserService {
    private userRepository: Repository<User>;

    constructor(userRepository: Repository<User>) {
        this.userRepository = userRepository;
    }

    public async findAll(): Promise<User[]> {
        try {
            return await this.userRepository.find();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching all users: " + error.message);
            }
            throw new Error('Unknown Error fetching all users');
        }
    }

    public async findById(id: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne({ where: { id: id } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching user with this id: " + error.message);
            }
            throw new Error('Unknown Error fetching user with this id');
        }
    }

    public async findByEmail(email: string): Promise<User | null> {
        try {
            return await this.userRepository.findOne({ where: { id: email } });
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching user with this email: " + error.message);
            }
            throw new Error('Unknown Error fetching user with this email');
        }
    }

    public async createUser(user: User): Promise<User> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("User creation unknown error: " + error.message);
            }
            throw new Error('User creation unknown error');
        }
    }

    public async updateUser(user: User): Promise<User> {
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("User update unknown error: " + error.message);
            }
            throw new Error('User update unknown error');
        }
    }

    public async findTop3ExpertsByDomain(domain: string): Promise<any[]> {
        try {
            return await this.userRepository
                .createQueryBuilder("user")
                .select([
                    "user.id",
                    "user.name",
                    "user.email"
                ])
                .addSelect("COUNT(DISTINCT article.id)", "articleCount")
                .addSelect("COALESCE(SUM(vote.vote_value), 0)", "voteSum")
                .addSelect("(COUNT(DISTINCT article.id) + COALESCE(SUM(vote.vote_value), 0))", "expertisePoints")
                .innerJoin("articles", "article", "article.author_id = user.id")
                .innerJoin("domains", "domain", "domain.article_id = article.id AND domain.name = :name", {name: domain})
                .leftJoin("votes", "vote", "vote.article_id = article.id")
                .groupBy("user.id")
                .orderBy("expertisePoints", "DESC")
                .limit(3)
                .getRawMany();
        } catch (error: any) {
            throw new Error("Error fetching top experts: " + error.message);
        }
    }
}