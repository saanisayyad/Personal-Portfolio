import express
  from "express"

import {

  createHobby,

  getHobbies,

  updateHobby,

  deleteHobby,

} from "../controllers/hobbyController.js"

import protect
  from "../middleware/authMiddleware.js"

const router =
  express.Router()

/* PUBLIC */
router.get(
  "/",
  getHobbies
)

/* ADMIN */
router.post(
  "/",
  protect,
  createHobby
)

router.put(
  "/:id",
  protect,
  updateHobby
)

router.delete(
  "/:id",
  protect,
  deleteHobby
)

export default router