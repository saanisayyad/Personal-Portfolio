import express
  from "express"

import {
  createEducation,
  getEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js"

import protect
  from "../middleware/authMiddleware.js"

const router =
  express.Router()

/* PUBLIC */
router.get(
  "/",
  getEducation
)

/* ADMIN */
router.post(
  "/",
  protect,
  createEducation
)

router.put(
  "/:id",
  protect,
  updateEducation
)

router.delete(
  "/:id",
  protect,
  deleteEducation
)

export default router