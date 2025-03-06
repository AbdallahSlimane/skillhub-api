import { Repository } from "typeorm";
import { Expertise } from "../models/expertise";

export class ExpertiseService {
    private expertiseRepository: Repository<Expertise>;

    constructor(expertiseRepository: Repository<Expertise>) {
        this.expertiseRepository = expertiseRepository;
    }

    public async createExpertise(expertise: Expertise): Promise<Expertise> {
        try {
            return await this.expertiseRepository.save(expertise);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error creating expertise: " + error.message);
            }
            throw new Error("Error creating expertise");
        }
    }

    public async updateExpertise(expertise: Expertise): Promise<Expertise> {
        try {
            return await this.expertiseRepository.save(expertise);
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error updating expertise: " + error.message);
            }
            throw new Error("Error updating expertise");
        }
    }

    public async getExpertiseByUser(userId: string): Promise<Expertise | null> {
        try {
            return await this.expertiseRepository.findOne({where: {userId}});
        } catch (error) {
            if (error instanceof Error) {
                throw new Error("Error fetching expertise for user: " + error.message);
            }
            throw new Error("Error fetching expertise for user");
        }
    }
}