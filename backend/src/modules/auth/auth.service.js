import bcrypt from "bcrypt"
import { conflict, unauthorized } from "../../errors/http-errors.js"
import { findStoreByEmail, findStoreById, insertStore } from "./auth.repository.js"
import { generateToken } from "./auth.utils.js"

function mapStoreSession(store) {
    return {
        id: store.id,
        name: store.name,
        email: store.email,
        phone: store.phone,
        image: store.image
    }
}

export async function loginStore(data) {
    const { email, password } = data

    const store = await findStoreByEmail(email)

    if (!store) {
        throw unauthorized("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(password, store.password_hash)

    if (!isPasswordValid) {
        throw unauthorized("Invalid credentials")
    }

    const token = generateToken(store)

    return {
        token,
        store: mapStoreSession(store)
    }
}

export async function registerStore(data) {
    const { name, email, password, phone, image } = data

    const existingStore = await findStoreByEmail(email)

    if (existingStore) {
        throw conflict("Store already exists")
    }

    const password_hash = await bcrypt.hash(password, 10)

    const store = await insertStore({
        name,
        email,
        password_hash,
        phone,
        image
    })

    return mapStoreSession(store)
}

export async function getStoreSession(storeId) {
    const store = await findStoreById(storeId)

    if (!store) {
        throw unauthorized("Unauthorized")
    }

    return mapStoreSession(store)
}