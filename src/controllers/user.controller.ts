import { ObjectId } from "mongodb";

import { Article } from "../models/article.ts";
import { User } from "../models/user.ts";
import { Request, Response, NextFunction } from "express";

export default class UserController {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { username, email, password, tags } = req.body;

    try {
      if (!username || !email || !password) {
        res.status(400).json({
          status: 400,
          message:
            "Bad Request. Fields (username, email, and password) cannot be empty",
        });
        return;
      }

      const user = await User.findOne({ username });
      if (user) {
        res.status(409).json({
          status: 409,
          message: "User already exists. Pick a new username",
        });
        return;
      }

      const userEmail = await User.findOne({ email });
      if (userEmail) {
        res.status(409).json({
          status: 409,
          message: "User already exists. Pick a new email",
        });
        return;
      }

      if (tags) {
        if (!Array.isArray(tags)) {
          res.status(400).json({
            status: 400,
            message: "Bad Request. Tags must be an array of strings",
          });
          return;
        }
      }

      const newUser = await User.create({
        username,
        email,
        password,
        tags,
      });

      await newUser.save();

      res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: {
          username: newUser.username,
          email: newUser.email,
          tags: newUser.tags,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async interactions(req: Request, res: Response, next: NextFunction) {
    const { view, like, user_id, article_id } = req.body;
    const id: string = article_id;

    const _id = new ObjectId(id);

    try {
      const updateOps: any = {};

      if (like) {
        updateOps.$addToSet = { "interactions.likes": user_id };
      }

      if (view) {
        updateOps.$inc = { "interactions.views": 1 };
      }

      const article = await Article.findByIdAndUpdate(_id, updateOps, {
        new: true,
      });

      if (!article) {
        res.status(404).json({
          status: 404,
          message: "Article not found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Article Successfully updated",
        data: {
          likes: article.interactions.likes.length,
          views: article.interactions.views,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
