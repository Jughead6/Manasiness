import { getAllUsers, getUserDetail, createNewUser, updateUser, disableUser, enableUser } from "./users.service.js"
import { parseOptionalSearch, requireText, parseOptionalImage, requirePhone, requireAllowedValue, requirePositiveInteger } from "../../utils/validators/index.js"

const USER_ROLES = ["customer", "worker", "supplier"]

export async function getUsers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const search = parseOptionalSearch(req.query.search, "search")

        const users = await getAllUsers({ storeId, search })

        res.json(users)
    } catch (error) {
        next(error)
    }
}

export async function getUserById(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")

        const user = await getUserDetail({ id, storeId })

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export async function createUser(req, res, next) {
    try {
        const storeId = req.store.storeId
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")
        const phone = requirePhone(req.body.phone, "phone")
        const role = requireAllowedValue(req.body.role, USER_ROLES, "role")

        const user = await createNewUser({ name, image, phone, role, storeId })

        res.status(201).json({
            message: "Create successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function editUser(req, res, next) {
    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const name = requireText(req.body.name, "name")
        const image = parseOptionalImage(req.body.image, "image")
        const phone = requirePhone(req.body.phone, "phone")
        const role = requireAllowedValue(req.body.role, USER_ROLES, "role")

        const user = await updateUser({ id, name, image, phone, role, storeId })

        res.status(200).json({
            message: "Edit successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateUser(req, res, next) {
    const isActive = false

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const user = await disableUser({ id, storeId, isActive })

        res.status(200).json({
            message: "User deactivated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function activateUser(req, res, next) {
    const isActive = true

    try {
        const storeId = req.store.storeId
        const id = requirePositiveInteger(req.params.id, "id")
        const user = await enableUser({ id, storeId, isActive })

        res.status(200).json({
            message: "User activated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}
