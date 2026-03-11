import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = Router();

auth.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      res.status(501).json({ message: "All fields required", success: false });

    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res
        .status(409)
        .json({ message: "Email already in use", success: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({ token, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

auth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      res
        .status(400)
        .json({ message: "Email and password required", success: false });

    const user = await User.findOne({ email });

    if (!user)
      res.status(404).json({ message: "User not found", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      res.status(401).json({ message: "Invalid credentials", success: false });

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(200).json({ token, success: true });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

export default auth;
