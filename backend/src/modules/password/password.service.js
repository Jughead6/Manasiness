import bcrypt from "bcrypt"
import { conflict, unauthorized } from "../../errors/http-errors.js"
import { findPasswordById, updatePassword } from "./password.repository.js"

export async function editAccountPassword(data) {
    const { storeId, currentPassword, newPassword, repeatPassword} = data

    const store = await findPasswordById({storeId})

    if (!store) {
        throw unauthorized("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, store.password_hash)

    if (!isPasswordValid) {
        throw unauthorized("Invalid credentials")
    }

    if (newPassword !== repeatPassword ) {
        throw conflict("Passwords do not match")
    }

    const passwordHash = await bcrypt.hash(newPassword, 10)

    return await updatePassword({storeId, passwordHash})


}