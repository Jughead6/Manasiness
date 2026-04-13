import { findAllUsers, findUserById, findUserByPhone, insertUser, updateUserById, updateUserStatus } from "./users.repository.js"
import { conflict, notFound } from "../../errors/http-errors.js"
import { requireAllowedValue, requirePositiveInteger, requireText } from "../../utils/validators.js"

const USER_ROLES = ["customer", "worker", "supplier"]
const USER_STATES = [true, false]

export async function getAllUsers(data) {
    return findAllUsers(data)
}

export async function getUserDetail(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    return user
}

export async function createNewUser(data) {
    const storeId = data.storeId
    const name = requireText(data.name, "name")
    const phone = requireText(data.phone, "phone")
    const role = requireAllowedValue(data.role, USER_ROLES, "role")
    const image = data.image?.trim() || null

    const existingUser = await findUserByPhone({ phone, storeId })

    if (existingUser) {
        throw conflict("User already exists")
    }

    return insertUser({
        name,
        image,
        phone,
        role,
        storeId
    })
}

export async function updateUser(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")
    const name = requireText(data.name, "name")
    const phone = requireText(data.phone, "phone")
    const image = data.image?.trim() || null

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    const existingUser = await findUserByPhone({ phone, storeId })

    if (existingUser && existingUser.id !== id) {
        throw conflict("User already exists")
    }

    if (data.role !== undefined) {
        const requestedRole = requireAllowedValue(data.role, USER_ROLES, "role")

        if (requestedRole !== user.role) {
            throw conflict("Role change unavailable")
        }
    }

    return updateUserById({
        name,
        image,
        phone,
        role: user.role,
        id,
        storeId
    })
}

export async function disableUser(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")
    const isActive = requireAllowedValue(data.isActive, USER_STATES, "is_active")

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    return updateUserStatus({
        isActive,
        id,
        storeId
    })
}

export async function enableUser(data) {
    const storeId = data.storeId
    const id = requirePositiveInteger(data.id, "user_id")
    const isActive = requireAllowedValue(data.isActive, USER_STATES, "is_active")

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    return updateUserStatus({
        isActive,
        id,
        storeId
    })
}
