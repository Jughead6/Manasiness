import { Router } from "express"
import { getCategories, getCategoryById, createCategory, editCategory, deactivateCategory, activateCategory, getCategoryOptions } from "./categories.controller.js"

const router = Router()

router.get("/", getCategories)
router.get("/options", getCategoryOptions)
router.post("/create", createCategory)
router.get("/:id", getCategoryById)
router.post("/:id/edit", editCategory)
router.patch("/:id/deactivate", deactivateCategory)
router.patch("/:id/activate", activateCategory)

export default router
