import {
    getAllUsers,
    getUserDetail,
    createNewUser,
    updateUser,
    disableUser,
    enableUser
} from "./users.service.js"

export async function getUsers(req, res, next) {
    try {
        const users = await getAllUsers()

        res.json(users)
    } catch (error) {
        next(error)
    }
}

export async function getUserById(req, res, next) {
    const { id } = req.params

    try {
        const user = await getUserDetail(id)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.json(user)
    } catch (error) {
        next(error)
    }
}

export async function createUser(req, res, next) {
    const { name, phone, role } = req.body

    try {
        const user = await createNewUser({ name, phone, role })

        if (!user) {
            return res.status(500).json({ error: "Uncreated user" })
        }

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
        const user = await updateUser(id, { name, image, phone, role })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

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

    try {
        const user = await disableUser(id)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

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

    try {
        const user = await enableUser(id)

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json({
            message: "User activated successfully",
            user
        })
    } catch (error) {
        next(error)
    }
}
