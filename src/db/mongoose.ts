import { log } from "../util/logger";
import mongoose from "mongoose";

mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
  log.info("Database Connected!");
});
