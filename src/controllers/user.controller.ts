import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { User } from "../models/user";

export class UserController {
    constructor(private userService: UserService) {}

    public async register(req: Request, res: Response): Promise<void> {
        const { name, password, email } = req.body;
        try {
            const user = new User(name, password, email, 0);
            const createdUser = await this.userService.createUser(user);
            res.status(201).json(createdUser);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        try {
            const user: User | null = await this.userService.findByEmail(email);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }

            if (user.password !== password) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }

            res.status(200).json({ message: "Login successful", user });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        try {
            const user = await this.userService.findById(userId);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            res.status(200).json(user);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async getExperts(req: Request, res: Response): Promise<void> {
        const domainName = req.query.topic as string;
        try {
            const experts = await this.userService.findTop3ExpertsByDomain(domainName);
            res.status(200).json(experts);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = req.params.id;
        const { name, email } = req.body;
        try {
            const user = await this.userService.findById(userId);
            if (!user) {
                res.status(404).json({ error: "User not found" });
                return;
            }
            user.name = name ?? user.name;
            user.email = email ?? user.email;
            const updatedUser = await this.userService.updateUser(user);
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}