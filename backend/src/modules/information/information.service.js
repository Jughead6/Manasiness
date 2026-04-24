import { conflict, unauthorized } from "../../errors/http-errors.js"
import { findInformationStore, updateInformationStore } from "./information.repository.js"
import { findStoreByEmail, findStoreById, findStoreByPhone } from "../auth/auth.repository.js"
import { getCurrencySymbol } from "../../utils/validators/index.js"

export async function getInformationStore(data) {
    const { storeId } = data

    const store = await findInformationStore({ storeId })

    if (!store) {
        throw unauthorized("Unauthorized")
    }

    return store
}

export async function editInformationStore(data) {
    const { storeId, name, email, phone, currency_code, image } = data

    const currentStore = await findStoreById(storeId)

    if (!currentStore) {
        throw unauthorized("Unauthorized")
    }

    const existingStoreByEmail = await findStoreByEmail(email)

    if (existingStoreByEmail && existingStoreByEmail.id !== storeId) {
        throw conflict("Email unavailable")
    }

    if (phone) {
        const existingStoreByPhone = await findStoreByPhone(phone)

        if (existingStoreByPhone && existingStoreByPhone.id !== storeId) {
            throw conflict("Phone unavailable")
        }
    }

    return updateInformationStore({
        storeId,
        name,
        email,
        phone,
        currency_code,
        currency_symbol: getCurrencySymbol(currency_code),
        cleanImage: image
    })
}
