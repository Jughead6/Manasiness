import { conflict, unauthorized } from "../../errors/http-errors.js"
import { findInformationStore, updateInformationStore } from "./information.repository.js"
import { findStoreByEmail, findStoreById } from "../auth/auth.repository.js"

export async function getInformationStore(data) {
    const { storeId } = data

    const store = await findInformationStore({ storeId })

    if (!store) {
        throw unauthorized("Unauthorized")
    }

    return store
}

export async function editInformationStore(data) {
    const { storeId, name, email, phone, image } = data

    const currentStore = await findStoreById(storeId)

    if (!currentStore) {
        throw unauthorized("Unauthorized")
    }

    const existingStore = await findStoreByEmail(email)

    if (existingStore && existingStore.id !== storeId) {
        throw conflict("Email unavailable")
    }

    return updateInformationStore({
        storeId,
        name,
        email,
        phone,
        cleanImage: image
    })
}
