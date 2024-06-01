import { Schema, model } from "mongoose";

const bookSchema = new Schema({
  name: String,
  desc: String,
  author: String,
  isbn: String,
  file: String,
  isAvailable: Boolean,
});

export const Book = model("book", bookSchema);
