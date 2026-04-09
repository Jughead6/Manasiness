import { Router } from "express"
import { getWorkers, getWorkerById, getWorkerOptions } from "./workers.controller.js"

const router = Router()

router.get("/", getWorkers)
router.get("/options", getWorkerOptions)
router.get("/:id", getWorkerById)

export default router