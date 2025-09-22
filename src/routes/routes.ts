import { Router } from "express";

import UserController from "../controllers/user.controller.ts";
import { ArticleController } from "../controllers/article.controller.ts";

const userController = new UserController();
const articleController = new ArticleController();
const router = Router();

/* Articles */
router.post("/articles", articleController.createPost);

router.get("/articles", articleController.getPosts);

router.get("/articles/:article_id", articleController.getPostById);

/* Users */
router.post("/users", userController.signUp);

router.patch("/interactions", userController.interactions);

export default router;
