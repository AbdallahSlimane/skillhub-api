import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { UserController } from "../controllers/user.controller";
import { VoteController } from "../controllers/vote.controller";
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/vote.service";
import { ShortArticleService } from "../services/short-article.service";
import { ShortArticleController } from "../controllers/short-article.controller";
import { Article } from "../models/article";
import { User } from "../models/user";
import { Vote } from "../models/vote";
import { ShortArticle } from "../models/short-article";
import { db } from "../data-source/data-source";
import {Chatbot} from "../models/chatbot";
import {ChatbotService} from "../services/chatbot.service";
import {ChatbotController} from "../controllers/chatbot.controller";
import {DomainService} from "../services/domain.service";
import {Domain} from "../models/domain";



const articleRepository = db.getRepository(Article);
const userRepository = db.getRepository(User);
const voteRepository = db.getRepository(Vote);
const chatbotRepository = db.getRepository(Chatbot);
const shortArticleRepository = db.getRepository(ShortArticle);
const domainRepository = db.getRepository(Domain);



const articleService = new ArticleService(articleRepository);
const userService = new UserService(userRepository);
const voteService = new VoteService(voteRepository, articleRepository);
const chatbotService = new ChatbotService(chatbotRepository);
const shortArticleService = new ShortArticleService(shortArticleRepository);
const domainService = new DomainService(domainRepository);


const articleController = new ArticleController(articleService, userService, domainService);
const userController = new UserController(userService);
const voteController = new VoteController(voteService);
const chatbotController = new ChatbotController(chatbotService);
const shortArticleController = new ShortArticleController(shortArticleService);


const userRouter = Router();
const articleRouter = Router();
const voteRouter = Router();
const chatbotRouter = Router();
const shortArticleRouter = Router();

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

shortArticleRouter.post("/create", (req, res) => shortArticleController.postShortArticle(req, res));
shortArticleRouter.get("/:article_id", (req, res) => shortArticleController.getShortArticle(req, res));

voteRouter.post("/upvote", (req, res) => voteController.upvote(req, res));
voteRouter.post("/downvote", (req, res) => voteController.downvote(req, res));
voteRouter.get("/:articleId", (req, res) => voteController.getVotesByArticle(req, res));

chatbotRouter.post("/chatbot", (req, res) => chatbotController.createMessage(req, res));

export { userRouter, articleRouter, voteRouter, chatbotRouter, shortArticleRouter };