import { editAccountPassword } from "./password.service.js"
import { requirePassword, requirePasswordMatch, requirePositiveInteger } from "../../utils/validators/index.js"

export async function editPassword(req, res, next) {
    try {
        const storeId = requirePositiveInteger(req.store.storeId, "store_id")
        const currentPassword = requirePassword(req.body.currentPassword, "currentPassword")
        const newPassword = requirePassword(req.body.newPassword, "newPassword")
        const repeatPassword = requirePassword(req.body.repeatPassword, "repeatPassword")

        requirePasswordMatch(newPassword, repeatPassword, "newPassword")

        await editAccountPassword({storeId, currentPassword, newPassword})

        res.status(200).json({
            message: "Password updated successfully"
        })
    } catch (error) {
        next(error)
    }
}