import express from "express";

import {
  createProject,
  getProjects,
  getProjectBySlug,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC
router.get("/", getProjects);

router.get("/:slug", getProjectBySlug);

// PROTECTED
router.post(
  "/",
  protect,
  upload.array("images", 3),
  createProject
);

router.put(
  "/:id",
  protect,
  upload.array("images", 3),
  updateProject
);

router.delete(
  "/:id",
  protect,
  deleteProject
);

export default router;