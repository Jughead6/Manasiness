import { Router } from "express"
import { getSuppliers, getSupplierById, getSupplierOptions } from "./suppliers.controller.js"

const router = Router()

router.get("/", getSuppliers)
router.get("/options", getSupplierOptions)
router.get("/:id", getSupplierById)

export default router