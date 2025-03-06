import { Router } from "express";

// Importation des contrôleurs
import { ArticleController } from "../controllers/article.controller";
import { UserController } from "../controllers/user.controller";
import { VoteController } from "../controllers/vote.controller";

// Importation des services
import { ArticleService } from "../services/article.service";
import { UserService } from "../services/user.service";
import { VoteService } from "../services/vote.service";

// Importation des entités pour obtenir les repositories via TypeORM
import { Article } from "../models/article";
import { User } from "../models/user";
import { Vote } from "../models/vote";
import { Domain } from "../models/domain";

// Importation de votre DataSource TypeORM (déjà configuré)
import { db } from "../data-source";

// Instanciation des repositories
const articleRepository = db.getRepository(Article);
const userRepository = db.getRepository(User);
const voteRepository = db.getRepository(Vote);
const domainRepository = db.getRepository(Domain);

// Instanciation des services
const articleService = new ArticleService(articleRepository);
const userService = new UserService(userRepository);
const voteService = new VoteService(voteRepository, articleRepository);

// Instanciation des contrôleurs
const articleController = new ArticleController(articleService, userService);
const userController = new UserController(userService);
const voteController = new VoteController(voteService);

// Création du routeur
const router = Router();

/**
 * Routes Utilisateurs (/users)
 */
router.post("/users/register", (req, res) => userController.register(req, res));
router.post("/users/login", (req, res) => userController.login(req, res));
router.get("/users/:id", (req, res) => userController.getUser(req, res));
router.put("/users/:id", (req, res) => userController.updateUser(req, res));

/**
 * Routes Articles & Documentation (/articles)
 */
router.post("/articles", (req, res) => articleController.createArticle(req, res));
router.get("/articles", (req, res) => articleController.getArticles(req, res));
router.get("/articles/:id", (req, res) => articleController.getArticle(req, res));
router.put("/articles/:id", (req, res) => articleController.updateArticle(req, res));
router.delete("/articles/:id", (req, res) => articleController.deleteArticle(req, res));

/**
 * Routes Votes & Gamification (/votes)
 */
router.post("/votes/upvote", (req, res) => voteController.upvote(req, res));
router.post("/votes/downvote", (req, res) => voteController.downvote(req, res));
router.get("/votes/:articleId", (req, res) => voteController.getVotesByArticle(req, res));

export default router;