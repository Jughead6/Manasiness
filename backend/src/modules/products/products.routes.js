import { Router } from "express"
import { getProducts, getProductById, createProduct, editProduct, deactivateProduct, activateProduct, getProductOptions } from "./products.controller.js"

const router = Router()

router.get("/", getProducts)
router.get("/options", getProductOptions)
router.post("/create", createProduct)
router.get("/:id", getProductById)
router.post("/:id/edit", editProduct)
router.patch("/:id/deactivate", deactivateProduct)
router.patch("/:id/activate", activateProduct)

export default router