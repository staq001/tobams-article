import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    tags: [
      {
        type: String,
        required: false,
      },
    ],
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

export const User = mongoose.model("User", userSchema);
