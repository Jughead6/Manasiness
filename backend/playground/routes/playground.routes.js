import { Router } from "express"

import { insertPlayground } from "../controllers/playground.controller.js"

const router = Router()

router.post("/", insertPlayground)

export default router