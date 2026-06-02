import express from "express";

import upload from "../middleware/upload.js";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/:id", getProjectById);

router.post(
  "/",
  upload.array("images", 3),
  createProject
);

router.put(
  "/:id",
  upload.array("images", 3),
  updateProject
);

router.delete(
  "/:id",
  deleteProject
);

export default router;