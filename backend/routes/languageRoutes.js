import express
  from "express"

import {

  createLanguage,

  getLanguages,

  updateLanguage,

  deleteLanguage,

} from "../controllers/languageController.js"

import protect
  from "../middleware/authMiddleware.js"

const router =
  express.Router()

/* PUBLIC */
router.get(
  "/",
  getLanguages
)

/* ADMIN */
router.post(
  "/",
  protect,
  createLanguage
)

router.put(
  "/:id",
  protect,
  updateLanguage
)

router.delete(
  "/:id",
  protect,
  deleteLanguage
)

export default router