import { findAllUsers, findUserById, findUserByPhone, insertUser, updateUserById, updateUserStatus } from "./users.repository.js"
import { conflict, notFound } from "../../errors/http-errors.js"

export async function getAllUsers(data) {
    return findAllUsers(data)
}

export async function getUserDetail(data) {
    const { id, storeId } = data

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    return user
}

export async function createNewUser(data) {
    const { storeId, name, phone, role, image } = data

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
    const { id, storeId, name, phone, role, image } = data

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (user.is_default) {
        throw conflict("User unavailable")
    }

    const existingUser = await findUserByPhone({ phone, storeId })

    if (existingUser && existingUser.id !== id) {
        throw conflict("User already exists")
    }

    if (role !== user.role) {
        throw conflict("Role change unavailable")
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
    const { id, storeId, isActive } = data

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (user.is_default) {
        throw conflict("User unavailable")
    }

    return updateUserStatus({
        isActive,
        id,
        storeId
    })
}

export async function enableUser(data) {
    const { id, storeId, isActive } = data

    const user = await findUserById({ id, storeId })

    if (!user) {
        throw notFound("User not found")
    }

    if (user.is_default) {
        throw conflict("User unavailable")
    }

    return updateUserStatus({
        isActive,
        id,
        storeId
    })
}
