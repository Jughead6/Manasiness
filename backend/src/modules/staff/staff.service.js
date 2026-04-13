import { findAllStaff, getStaffTotalRows, insertStaff } from "./staff.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger, requirePositiveNumber } from "../../utils/validators.js"

const STAFF_STATES = ["pending", "paid", "canceled"]

export async function getAllStaff(data) {
    const [rows, total] = await Promise.all([
        findAllStaff(data),
        getStaffTotalRows(data)
    ])

    return {
        rows,
        total_rows: Number(total.total_rows)
    }
}

export async function createNewStaff(data) {
    const storeId = data.storeId
    const userId = requirePositiveInteger(data.user_id, "user_id")
    const salary = requirePositiveNumber(data.salary, "salary")
    const state = requireAllowedValue(data.state, STAFF_STATES, "state")

    const user = await findUserById({ id: userId, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (!user.is_active) {
        throw conflict("User unavailable")
    }

    if (user.role !== "worker") {
        throw badRequest("Invalid worker")
    }

    return insertStaff({
        user_id: userId,
        salary,
        state,
        storeId
    })
}
