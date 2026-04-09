import { Router } from "express"
import { getUsers, getUserById, createUser, editUser, deactivateUser, activateUser } from "./users.controller.js"

const router = Router()

router.get("/", getUsers)
router.post("/create", createUser)
router.get("/:id", getUserById)
router.post("/:id/edit", editUser)
router.patch("/:id/deactivate", deactivateUser)
router.patch("/:id/activate", activateUser)

export default router
