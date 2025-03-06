import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    id: string;

    @Column({ length: 100, name: "name" })
    name: string;

    @Column({ unique: true, name: "email" })
    email: string;

    @Column({ default: 0, name: "points" })
    points: number;

    constructor(name: string, email: string, points: number) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.points = points;
    }
}
