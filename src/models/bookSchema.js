"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: String,
    desc: String,
    author: String,
    isbn: String,
    file: String,
    isAvailable: Boolean,
});
exports.Book = (0, mongoose_1.model)("book", bookSchema);