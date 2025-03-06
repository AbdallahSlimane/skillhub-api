import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { UserController } from "../controllers/user.controller";
import { VoteController } from "../controllers/vote.controller";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/vote.service";
import { Article } from "../models/article";
import { User } from "../models/user";
import { Vote } from "../models/vote";
import { db } from "../data-source/data-source";


const articleRepository = db.getRepository(Article);
const userRepository = db.getRepository(User);
const voteRepository = db.getRepository(Vote);



const articleService = new ArticleService(articleRepository);
const userService = new UserService(userRepository);
const voteService = new VoteService(voteRepository, articleRepository);


const articleController = new ArticleController(articleService, userService);
const userController = new UserController(userService);
const voteController = new VoteController(voteService);


const userRouter = Router();
const articleRouter = Router();
const voteRouter = Router();

userRouter.post("/register", (req, res) => userController.register(req, res));
userRouter.post("/login", (req, res) => userController.login(req, res));
userRouter.get("/:id", (req, res) => userController.getUser(req, res));
userRouter.get("/id/users", (req, res) => userController.getAllUsers(req, res));
userRouter.put("/:id", (req, res) => userController.updateUser(req, res));
userRouter.get("/experts/:topic", (req, res) => userController.getExperts(req, res));


articleRouter.post("/create", (req, res) => articleController.createArticle(req, res));
articleRouter.get("/articles", (req, res) => articleController.getArticles(req, res));
articleRouter.get("/:id", (req, res) => articleController.getArticle(req, res));
articleRouter.put("/update/:id", (req, res) => articleController.updateArticle(req, res));
articleRouter.delete("/delete/:id", (req, res) => articleController.deleteArticle(req, res));


voteRouter.post("/upvote", (req, res) => voteController.upvote(req, res));
voteRouter.post("/downvote", (req, res) => voteController.downvote(req, res));
voteRouter.get("/:articleId", (req, res) => voteController.getVotesByArticle(req, res));

export { userRouter, articleRouter, voteRouter };