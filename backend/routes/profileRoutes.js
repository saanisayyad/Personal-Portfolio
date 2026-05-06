import express from "express";

import upload from "../middleware/upload.js";

import { getProfile, updateProfile } from "../controllers/profileController.js";

import uploadResume from "../middleware/resumeUpload.js";

const router = express.Router();

router.get("/", getProfile);

router.put(
  "/",
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1,
    },
    {
      name: "resume",
      maxCount: 1,
    },
  ]),
  updateProfile
)

export default router;
