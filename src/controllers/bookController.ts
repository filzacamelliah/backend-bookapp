import { Request, Response } from "express";
import { Book } from "../models/bookSchema";
import { bookRouter } from "../routes/bookRoute";

export const bookController = {
  getData: async (req: Request, res: Response) => {
    const { search } = req.query;

    const CLAUSES = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { desc: { $regex: search, $options: "i" } },
            { author: { $regex: search, $options: "i" } },
          ],
        }
      : {};
    const allBooks = await Book.find(CLAUSES);
    return res.json(allBooks);
  },

  getSingleData: async (req: Request, res: Response) => {
    const { id } = req.params;

    const book = await Book.findById(id);
    return res.json(book);
  },

  createData: async (req: Request, res: Response) => {
    const { name, desc, author, isbn } = req.body;
    // const file = req.file; //file yang akan diterima dari upload.single //save file to public folder

    const createBook = new Book({
      name,
      desc,
      author,
      isbn,
      file: req.file?.originalname,
      isAvailable: true,
    });
    const saved = await createBook.save();
    return res.json({ message: "good", data: saved });
  },
  updateData: async (req: Request, res: Response) => {
    const { id } = req.params;

    //bikin logic update book based on bookId, isAvailable = false
    const updateBook = await Book.findByIdAndUpdate(id, { isAvailable: false });
    return res.json({ updateBook });
  },
};
