import { getAllUsers, getUserDetail, createNewUser, updateUser, disableUser, enableUser } from "./users.service.js"

const DEFAULT_USER_IMAGE = "https://i.postimg.cc/DzKtGYCx/nouserphoto.png"

export async function getUsers(req, res, next) {
    try {
        const storeId = req.store.storeId
        const { search = "" } = req.query
        const users = await getAllUsers({storeId, search})

        res.json(users)
    } catch (error) {
        next(error)
    }
}

export async function getUserById(req, res, next) {
    const { id } = req.params

    try {
        const storeId = req.store.storeId
        const user = await getUserDetail({id, storeId})

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export async function createUser(req, res, next) {
    const { name, image, phone, role } = req.body

    try {
        const storeId = req.store.storeId
        const cleanPhone = phone?.trim() || null
        const cleanImage = image?.trim() || DEFAULT_USER_IMAGE
        const user = await createNewUser({name, image: cleanImage, phone: cleanPhone, role, storeId})

        res.status(201).json({
            message: "Create successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function editUser(req, res, next) {
    const { id } = req.params
    const { name, image, phone, role } = req.body

    try {
        const storeId = req.store.storeId
        const cleanPhone = phone?.trim() || null
        const cleanImage = image?.trim() || DEFAULT_USER_IMAGE
        const user = await updateUser({id, name, image: cleanImage, phone: cleanPhone, role, storeId})

        res.status(200).json({
            message: "Edit successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function deactivateUser(req, res, next) {
    const { id } = req.params
    const isActive = false

    try {
        const storeId = req.store.storeId
        const user = await disableUser({id, storeId, isActive})

        res.status(200).json({
            message: "User deactivated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}

export async function activateUser(req, res, next) {
    const { id } = req.params
    const isActive = true

    try {
        const storeId = req.store.storeId
        const user = await enableUser({id, storeId, isActive})

        res.status(200).json({
            message: "User activated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}
