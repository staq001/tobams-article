import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { Request, Response, NextFunction } from "express";

import { limiter } from "./middleware/limiter.ts";
import { log } from "./util/logger.ts";
import "./db/mongoose.ts";
import router from "./routes/routes.ts";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(helmet());
app.use(morgan("tiny"));
app.use(limiter);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);

app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: `Sorry, this route ${req.protocol}://${req.get("host")}${
      req.originalUrl
    } doesn't exist.`,
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  res.status(err.status || 500).json({
    status: 500,
    message: err.message || "Internal Server Error",
  });
});

const server = app.listen(port, () => {
  log.info(`Server listening on port ${port}`);
});

process.on("SIGTERM", () => {
  log.debug(`SIGTERM signal received: closing HTTP server`);
  server.close(() => {
    log.debug("HTTP server closed");
  });
});
