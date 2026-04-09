import {
    findAllUsers,
    findUserById,
    insertUser,
    updateUserById,
    updateUserStatus
} from "./users.repository.js"

export async function getAllUsers() {
    return findAllUsers()
}

export async function getUserDetail(id) {
    return findUserById(id)
}

export async function createNewUser(data) {
    return insertUser(data)
}

export async function updateUser(id, data) {
    return updateUserById(id, data)
}

export async function disableUser(id) {
    return updateUserStatus(id, false)
}

export async function enableUser(id) {
    return updateUserStatus(id, true)
}
