import { findAllStaff, insertStaff } from "./staff.repository.js"

export async function getAllStaff(orderDirection) {
    return findAllStaff(orderDirection)
}

export async function createNewStaff(data) {
    return insertStaff(data)
}
