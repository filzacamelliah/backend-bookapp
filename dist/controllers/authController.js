"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const userSchema_1 = require("../models/userSchema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.authController = {
    createUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const createUser = new userSchema_1.User({
            name,
            email,
            password,
        });
        const saved = yield createUser.save();
        return res.json(saved);
    }),
    loginUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        const user = yield userSchema_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(404).json({ message: "Password incorect" });
        }
        const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.json({ user: payload, token });
    }),
};
