import { getAllStaff, createNewStaff } from "./staff.service.js"

export async function getStaff(req, res, next) {
    const { sort = "recent" } = req.query
    const orderDirection = sort === "oldest" ? "ASC" : "DESC"

    try {
        const staff = await getAllStaff(orderDirection)

        res.json(staff)
    } catch (error) {
        next(error)
    }
}

export async function registerStaff(req, res, next) {
    const { user_id, salary, state } = req.body

    try {
        const staff = await createNewStaff({ user_id, salary, state })

        res.status(201).json({
            message: "Register successfully",
            staff
        })
    } catch (error) {
        next(error)
    }
}
