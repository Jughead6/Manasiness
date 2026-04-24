import { findAllStaff, getStaffTotalRows, getStaffWindowInfo, insertStaff } from "./staff.repository.js"
import { findUserById } from "../users/users.repository.js"
import { badRequest, conflict, notFound } from "../../errors/http-errors.js"

export async function getAllStaff(data) {
    const [rows, total, windowInfo] = await Promise.all([
        findAllStaff(data),
        getStaffTotalRows(data),
        getStaffWindowInfo(data)
    ])

    return {
        rows,
        total_rows: Number(total.total_rows),
        start_date: windowInfo.start_date,
        end_date: windowInfo.end_date,
        has_older: windowInfo.has_older,
        has_newer: windowInfo.has_newer
    }
}

export async function createNewStaff(data) {
    const { storeId, userId, salary, state } = data

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

    if (user.is_default && state === "pending") {
        throw badRequest("Invalid state")
    }

    return insertStaff({
        user_id: userId,
        salary,
        state,
        storeId
    })
}
