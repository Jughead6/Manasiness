import { Router } from 'express'
import { getUsers, getUserById, createUser, editUser } from '../controllers/users.controller.js'

const router = Router()

router.get("/", getUsers)
router.get("/:id", getUserById)
router.post("/:id/edit", editUser)
router.post("/create", createUser)

export default router