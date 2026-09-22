import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// LOGIN
// Public registration is intentionally disabled for this single-owner portfolio.
export const loginUser = async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user._id,
        email: user.email,
        token: generateToken(user._id),
      });
    }

    return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to process login",
    });
  }
};
