import mongoose from "mongoose";
const { Schema } = mongoose;

const interactionsSchema = new Schema(
  {
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interactions: {
      type: interactionsSchema,
      default: () => ({}),
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const Article = mongoose.model("Article", articleSchema);
