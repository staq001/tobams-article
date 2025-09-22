import { ObjectId } from "mongodb";
import { Request, Response, NextFunction } from "express";
import { Article } from "../models/article.ts";
import { generateSummary } from "../util/gemini.ts";

export class ArticleController {
  async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content, summary, author } = req.body;

      if (!title || !content || !author) {
        res.status(400).json({
          status: 400,
          message: "Bad Request",
        });
        return;
      }

      const AISummary = summary ? summary : await generateSummary(title);

      const id: string = author;
      const authorId = new ObjectId(id);

      const article = await Article.create({
        title,
        summary: AISummary,
        content,
        author: authorId,
      });

      await article.save();

      res.status(201).json({
        status: 201,
        message: "Article created successfully!",
        data: {
          article,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const skip = (page - 1) * limit;

    try {
      const total = await Article.countDocuments();
      const articles = await Article.find().sort().skip(skip).limit(limit);

      if (!articles) {
        res.status(404).json({
          status: 404,
          message: "Articles not found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Successful!",
        data: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          articles,
        },
      });
    } catch (e) {
      next(e);
    }
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    try {
      const { article_id } = req.params;
      const id = new ObjectId(article_id);

      const article = await Article.findById({ _id: id });
      if (!article) {
        res.status(404).json({
          status: 404,
          message: "Article not found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "Article found",
        data: {
          article,
        },
      });
    } catch (e) {
      next(e);
    }
  }
}
