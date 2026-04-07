import { Router } from 'express'
import { getCategories, getCategoryId, createCategory, editCategory } from '../controllers/categories.controller.js'

const router = Router()

router.get("/", getCategories)
router.get("/:id", getCategoryId)
router.post("/:id/edit", editCategory)
router.post("/create", createCategory)

export default router