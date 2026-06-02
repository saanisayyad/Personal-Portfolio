import express from "express";

import {
  createNote,
  getNotes,
  getNoteBySlug,
  updateNote,
  deleteNote,
} from "../controllers/noteController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getNotes);

router.get("/:slug", getNoteBySlug);

router.post("/", protect, createNote);

router.put("/:id", protect, updateNote);

router.delete("/:id", protect, deleteNote);

export default router;