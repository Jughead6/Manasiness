import { Router } from "express"
import { getCategories, getCategoryId, createCategory, editCategory, deactivateCategory } from "../controllers/categories.controller.js"

const router = Router()

router.get("/", getCategories)
router.get("/:id", getCategoryId)
router.post("/:id/edit", editCategory)
router.patch(`/:id/deactivate`, deactivateCategory)
router.post("/create", createCategory)

export default router