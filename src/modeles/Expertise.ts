import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity("expertise")

export class Expertise{

@PrimaryGeneratedColumn("uuid")
id: string;

@Column({type:"uuid",
        name:"user_id",
        comment:"Foreign key referencing user.id"})
userId: string;

@Column({name:"topic", length:100})
topic:string;

@Column({type:"int" ,name:"reputation_score" , default:0})
reputationScore: number;

constructor(id: string,userId: string, topic: string, reputationScore = 0 ) {
    this.id = uuidv4();
    this.userId=userId;
    this.topic = topic;
    this.reputationScore = reputationScore;
  }
  

}