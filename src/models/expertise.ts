import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { User } from "./user";
import { Domain } from "./domain";
import * as domain from "node:domain";

@Entity({ name: "expertise" })
export class Expertise {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ name: "user_id" })
    userId: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column({ name: "domain_id" })
    domainId: string;

    @ManyToOne(() => Domain, { onDelete: "CASCADE" })
    @JoinColumn({ name: "domain_id" })
    domain: Domain;

    @Column({ type: "int", name: "reputation_score", default: 0 })
    reputationScore: number;


    constructor(id: string, userId: string, user: User, domainId: string, domain: Domain, reputationScore: number) {
        this.id = id;
        this.userId = userId;
        this.user = user;
        this.domainId = domainId;
        this.domain = domain;
        this.reputationScore = reputationScore;
    }
}
