import { getAllStaff, createNewStaff } from "./staff.service.js"
import { parseHistoryWindowQuery, requirePositiveInteger, requirePositiveNumber, requireAllowedValue } from "../../utils/validators/index.js"

const STAFF_STATES = ["pending", "paid", "canceled"]

export async function getStaff(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { orderDirection, limit, rowOffset, dayOffset, period } = parseHistoryWindowQuery(req.query)

        const staff = await getAllStaff({ storeId, orderDirection, limit, rowOffset, dayOffset, period })

        res.json(staff)
    } catch (error) {
        next(error)
    }
}

export async function registerStaff(req, res, next) {
    try {
        const storeId = req.store.storeId
        const userId = requirePositiveInteger(req.body.user_id, "user_id")
        const salary = requirePositiveNumber(req.body.salary, "salary")
        const state = requireAllowedValue(req.body.state, STAFF_STATES, "state")

        const staff = await createNewStaff({ userId, salary, state, storeId })

        res.status(201).json({
            message: "Register successfully",
            staff
        })
    } catch (error) {
        next(error)
    }
}
