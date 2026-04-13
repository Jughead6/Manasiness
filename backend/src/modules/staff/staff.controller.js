import { getAllStaff, createNewStaff } from "./staff.service.js"
import { requirePositiveInteger } from "../../utils/validators.js"

export async function getStaff(req, res, next) {
    const { sort = "recent", page = 1 } = req.query
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"
    const currentPage = requirePositiveInteger(page, "page")
    const limit = 20
    const offset = (currentPage - 1) * limit

    try {
        const storeId = req.store.storeId
        const staff = await getAllStaff({ orderDirection, limit, offset, storeId })

        res.json(staff)
    } catch (error) {
        next(error)
    }
}

export async function registerStaff(req, res, next) {
    const { user_id, salary, state } = req.body

    try {
        const storeId = req.store.storeId
        const staff = await createNewStaff({ user_id, salary, state, storeId })

        res.status(201).json({
            message: "Register successfully",
            staff
        })
    } catch (error) {
        next(error)
    }
}