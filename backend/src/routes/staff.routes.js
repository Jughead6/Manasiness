import { Router } from 'express'
import { getStaff } from '../controllers/staff.controller.js'

const router = Router()

router.get("/", getStaff)

export default router