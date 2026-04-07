import { Router } from "express"
import { getWorkers, getWorkersById } from "../controllers/workers.controller.js"

const router = Router()

router.get("/", getWorkers)
router.get("/:id", getWorkersById)

export default router