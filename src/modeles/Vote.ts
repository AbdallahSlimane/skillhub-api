import { timeStamp } from "console";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from "typeorm";
import {v4 as uuidv4} from 'uuid';

@Entity("votes")
export class Vote{
@PrimaryGeneratedColumn("uuid")
    id:string;       
@Column({type:"uuid", 
        name:"user_id" , 
        comment:"Foreign key referencing user.id"})

    userId: string;

@Column({name:"article_id" ,
    type:"uuid" ,
    comment:"Foreign key referencing articles.id"})  

    articleId: string;

@Column("vote_value")    
    voteValue :number;
@CreateDateColumn({name:"created_at" , 
  default:()=>"CURRENT_TIMESTAMP"})    
  
createdAt:Date;

    constructor(id:string , userId: string , articleId:string, voteValue:number ){
      this.id=uuidv4();
      this.userId=userId;
      this.articleId=articleId;
      this.voteValue=voteValue;
      this.createdAt=new Date;
    }

    
    }