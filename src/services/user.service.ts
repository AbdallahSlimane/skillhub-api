import { Repository } from "typeorm";
import { User } from "../models/user";

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


}