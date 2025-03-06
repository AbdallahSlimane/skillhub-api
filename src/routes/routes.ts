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


const router = Router();


router.post("/register", (req, res) => userController.register(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.get("/:id", (req, res) => userController.getUser(req, res));
router.put("/:id", (req, res) => userController.updateUser(req, res));


router.post("/articles", (req, res) => articleController.createArticle(req, res));
router.get("/articles", (req, res) => articleController.getArticles(req, res));
router.get("/articles/:id", (req, res) => articleController.getArticle(req, res));
router.put("/articles/:id", (req, res) => articleController.updateArticle(req, res));
router.delete("/articles/:id", (req, res) => articleController.deleteArticle(req, res));


router.post("/votes/upvote", (req, res) => voteController.upvote(req, res));
router.post("/votes/downvote", (req, res) => voteController.downvote(req, res));
router.get("/votes/:articleId", (req, res) => voteController.getVotesByArticle(req, res));

export default router;