import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { bookRouter } from "./routes/bookRoute";
import { authRouter } from "./routes/authRouter";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log("Mongo Connected"))
  .catch(() => console.log("Mongo Connection Error"));

const app = express();

app.use(express.json()); //redaing json
app.use(express.urlencoded({ extended: true })); //reading formdata
app.use(express.static("public"));

app.use(cors({ origin: ["http://localhost:5173"] }));

app.use("/books", bookRouter);
app.use("/auth", authRouter);

app.listen(8000);
