import express from "express";
import {
  createNote,
  getNotes,
  getNoteById,
  updateNote,
  deleteNote
} from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", getNotes);
router.get("/:id", getNoteById);

// PROTECTED (ADMIN)
router.post("/", protect, createNote);
router.put("/:id", protect, updateNote);
router.delete("/:id", protect, deleteNote);

export default router;