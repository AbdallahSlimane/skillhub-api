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
        res.status(200).json({ message: "Login endpoint not implemented yet." });
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
        const domainId = req.query.topic as string;
        try {
            const experts = await this.userService.findExpertsByDomain(domainId);
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