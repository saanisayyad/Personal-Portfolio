import express
  from "express"

import {
  createSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js"

import protect
  from "../middleware/authMiddleware.js"

const router =
  express.Router()

/* PUBLIC */
router.get(
  "/",
  getSkills
)

/* ADMIN */
router.post(
  "/",
  protect,
  createSkill
)

router.put(
  "/:id",
  protect,
  updateSkill
)

router.delete(
  "/:id",
  protect,
  deleteSkill
)

export default router