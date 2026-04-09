import { Router } from "express"
import { getCustomers, getCustomerById, getCustomerOptions } from "./customers.controller.js"

const router = Router()

router.get("/", getCustomers)
router.get("/options", getCustomerOptions)
router.get("/:id", getCustomerById)

export default router