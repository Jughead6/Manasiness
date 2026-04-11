import { findAllStaff, insertStaff } from "./staff.repository.js"

export async function getAllStaff(data) {
    return findAllStaff(data)
}

export async function createNewStaff(data) {
    return insertStaff(data)
}
