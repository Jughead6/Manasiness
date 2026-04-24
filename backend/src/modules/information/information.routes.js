import { Router } from "express"
import { getInformation, editInformation } from "./information.controller.js"

const router = Router()

router.get("/", getInformation)
router.post("/edit", editInformation)

export default router