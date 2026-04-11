import { findAllUsers, findUserById, insertUser, updateUserById, updateUserStatus } from "./users.repository.js"

export async function getAllUsers(data) {
    return findAllUsers(data)
}

export async function getUserDetail(data) {
    return findUserById(data)
}

export async function createNewUser(data) {
    return insertUser(data)
}

export async function updateUser(data) {
    return updateUserById(data)
}

export async function disableUser(data) {
    return updateUserStatus(data)
}

export async function enableUser(data) {
    return updateUserStatus(data)
}
