import bcrypt from "bcrypt"
import { badRequest, conflict, unauthorized } from "../../errors/http-errors.js"
import { sendPasswordResetEmail, sendVerificationEmail } from "../../utils/email/email.service.js"
import { findEmailCode, findPasswordResetCode, findStoreByEmail, findStoreById, insertEmailCode, insertPasswordResetCode, insertStore, removeEmailCode, removePasswordResetCode, updateStorePasswordByEmail } from "./auth.repository.js"
import { generateToken } from "./auth.utils.js"

function mapStoreSession(store) {
    return {
        id: store.id,
        name: store.name,
        email: store.email,
        phone: store.phone,
        currency_code: store.currency_code,
        currency_symbol: store.currency_symbol,
        image: store.image
    }
}

function generateEmailCode() {
    return String(Math.floor(100000 + Math.random() * 900000))
}

function getEmailCodeExpirationDate() {
    return new Date(Date.now() + 10 * 60 * 1000)
}

async function validateEmailCode(data) {
    const { email, code } = data
    const verification = await findEmailCode(email)

    if (!verification) {
        throw badRequest("Code invalid")
    }

    if (new Date(verification.expires_at).getTime() < Date.now()) {
        await removeEmailCode(email)
        throw badRequest("Code invalid")
    }

    const isCodeValid = await bcrypt.compare(code, verification.code_hash)

    if (!isCodeValid) {
        throw badRequest("Code invalid")
    }

    return true
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

export async function sendRegisterCode(data) {
    const { email } = data
    const existingStore = await findStoreByEmail(email)

    if (existingStore) {
        throw conflict("Register failed")
    }

    const code = generateEmailCode()
    const code_hash = await bcrypt.hash(code, 10)
    const expires_at = getEmailCodeExpirationDate()

    await insertEmailCode({ email, code_hash, expires_at })

    try {
        await sendVerificationEmail({ to: email, code })
    } catch (error) {
        await removeEmailCode(email)
        throw error
    }
}

export async function verifyRegisterCode(data) {
    const { email, code } = data
    const existingStore = await findStoreByEmail(email)

    if (existingStore) {
        throw conflict("Register failed")
    }

    await validateEmailCode({ email, code })
}

export async function registerStore(data) {
    const { name, email, password, phone, image, code } = data

    const existingStore = await findStoreByEmail(email)

    if (existingStore) {
        throw conflict("Register failed")
    }

    await validateEmailCode({ email, code })

    const password_hash = await bcrypt.hash(password, 10)

    const store = await insertStore({
        name,
        email,
        password_hash,
        phone,
        image
    })

    await removeEmailCode(email)

    return mapStoreSession(store)
}

export async function getStoreSession(storeId) {
    const store = await findStoreById(storeId)

    if (!store) {
        throw unauthorized("Unauthorized")
    }

    return mapStoreSession(store)
}

async function validatePasswordResetCode(data) {
    const { email, code } = data
    const verification = await findPasswordResetCode(email)

    if (!verification) {
        throw badRequest("Code invalid")
    }

    if (new Date(verification.expires_at).getTime() < Date.now()) {
        await removePasswordResetCode(email)
        throw badRequest("Code invalid")
    }

    const isCodeValid = await bcrypt.compare(code, verification.code_hash)

    if (!isCodeValid) {
        throw badRequest("Code invalid")
    }

    return true
}

export async function sendPasswordResetCode(data) {
    const { email } = data
    const store = await findStoreByEmail(email)

    if (!store) {
        return
    }

    const code = generateEmailCode()
    const code_hash = await bcrypt.hash(code, 10)
    const expires_at = getEmailCodeExpirationDate()

    await insertPasswordResetCode({ email, code_hash, expires_at })

    try {
        await sendPasswordResetEmail({ to: email, code })
    } catch (error) {
        await removePasswordResetCode(email)
        throw error
    }
}

export async function verifyPasswordResetCode(data) {
    const { email, code } = data
    const store = await findStoreByEmail(email)

    if (!store) {
        throw badRequest("Code invalid")
    }

    await validatePasswordResetCode({ email, code })
}

export async function resetStorePassword(data) {
    const { email, code, password } = data
    const store = await findStoreByEmail(email)

    if (!store) {
        throw badRequest("Code invalid")
    }

    await validatePasswordResetCode({ email, code })

    const isSamePassword = await bcrypt.compare(password, store.password_hash)

    if (isSamePassword) {
        throw conflict("Password unchanged")
    }

    const password_hash = await bcrypt.hash(password, 10)
    const updatedStore = await updateStorePasswordByEmail({ email, password_hash })

    await removePasswordResetCode(email)

    return mapStoreSession(updatedStore)
}

