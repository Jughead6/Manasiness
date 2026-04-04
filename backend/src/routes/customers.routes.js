import { Router } from 'express'
import { getCustomers, getCustomersById } from '../controllers/customers.controller.js'

const router = Router()

router.get("/", getCustomers)
router.get("/:id", getCustomersById)

export default router