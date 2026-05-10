import express from "express";
import {
  uploadImage,
  getImages,
  deleteImage
} from "../controllers/galleryController.js";

import protect from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// PUBLIC
router.get("/", getImages);

// PROTECTED
router.post("/", protect, upload.array("images", 20), uploadImage);
router.delete("/:id", protect, deleteImage);

export default router;