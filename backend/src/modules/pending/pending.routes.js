import { Router } from "express"
import { getPendingSummary, getCustomersPending, getSuppliersPending, getWorkersPending, updatePendingState } from "./pending.controller.js"

const router = Router()

router.get("/summary", getPendingSummary)
router.get("/customers", getCustomersPending)
router.get("/suppliers", getSuppliersPending)
router.get("/workers", getWorkersPending)
router.patch("/:scope/:id/state", updatePendingState)

export default router
