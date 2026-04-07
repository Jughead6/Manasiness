import { Router } from "express"
import { getSuppliers, getSuppliersById } from "../controllers/suppliers.controller.js"

const router = Router()

router.get("/", getSuppliers)
router.get("/:id", getSuppliersById)

export default router