import { Request, Response } from "express";
import { User } from "../models/userSchema";
import jwt from "jsonwebtoken";

export const authController = {
  createUser: async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const createUser = new User({
      name,
      email,
      password,
    });
    const saved = await createUser.save();
    return res.json(saved);
  },

  loginUser: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

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
    const token = jwt.sign(payload, process.env.JWT_SECRET!);
    return res.json({ user: payload, token });
  },
};
