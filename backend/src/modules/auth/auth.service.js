import bcrypt from "bcrypt"
import { findStoreByEmail, findStoreById, insertStore } from "./auth.repository.js"
import { generateToken } from "./auth.utils.js"

export async function loginStore(email, password) {
    const store = await findStoreByEmail(email)

    if (!store) {
        return null
    }

    const isPasswordValid = await bcrypt.compare(password, store.password_hash)

    if (!isPasswordValid) {
        return null
    }

    const token = generateToken(store)

    return {
        token,
        store: {
            id: store.id,
            name: store.name,
            email: store.email,
            phone: store.phone,
            image: store.image
        }
    }
}

export async function registerStore(data) {
    const { name, email, password, phone, image } = data

    const existingStore = await findStoreByEmail(email)

    if (existingStore) {
        return null
    }

    const password_hash = await bcrypt.hash(password, 10)

    const store = await insertStore({ name, email, password_hash, phone, image })

    if (!store) {
        return null
    }

    return {
        id: store.id,
        name: store.name,
        email: store.email,
        phone: store.phone,
        image: store.image
    }
}

export async function getStoreSession(storeId) {
    const store = await findStoreById(storeId)

    if (!store) {
        return null
    }

    return {
        id: store.id,
        name: store.name,
        email: store.email,
        phone: store.phone,
        image: store.image
    }
}