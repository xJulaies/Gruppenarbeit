import mongoose, { Document, Schema } from "mongoose";

export interface IBook extends Document {
  title: string;
  description: string;
  author: string;
  published: string;
  status: boolean;
  userIdClerk: string;
}

const BookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    published: { type: String, required: true, trim: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const book = mongoose.model<IBook>("Book", BookSchema);
