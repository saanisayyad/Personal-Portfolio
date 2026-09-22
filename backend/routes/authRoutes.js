import express from "express";
import { loginUser } from "../controllers/authController.js";

const router = express.Router();

// Authentication is intentionally login-only.
// New users cannot self-register through the public API.
router.post("/login", loginUser);

export default router;
