import { Router } from "express"
import { getCustomersPending, getSuppliersPending, getWorkersPending } from "./pending.controller.js"

const router = Router()

router.get("/customers", getCustomersPending)
router.get("/suppliers", getSuppliersPending)
router.get("/workers", getWorkersPending)

export default router