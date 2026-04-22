import { editAccountPassword } from "./password.service.js"

export async function editPassword(req, res, next) {
    const { currentPassword, newPassword, repeatPassword} = req.body

    try {
        const storeId = req.store.storeId
        await editAccountPassword({storeId, currentPassword, newPassword, repeatPassword})

        res.status(200).json({
            message: "Password updated successfully",
        })
    } catch (error) {
        next(error)
    }
}