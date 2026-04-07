import { Router } from 'express'
import { getProducts, getProductById, createProduct, editProduct } from '../controllers/products.controller.js'

const router = Router()

router.get("/", getProducts)
router.get("/:id", getProductById)
router.post("/:id/edit", editProduct)
router.post("/create", createProduct)

export default router