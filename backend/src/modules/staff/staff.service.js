import { findAllStaff, getStaffTotalRows, insertStaff } from "./staff.repository.js"

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
    return insertStaff(data)
}