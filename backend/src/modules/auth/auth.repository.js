import pool from "../../config/db.js"

export async function findStoreByEmail(email) {
    const result = await pool.query(`
        SELECT id, name, email, password_hash, phone, currency_code, currency_symbol, image
        FROM stores
        WHERE email = $1
    `, [email])

    return result.rows[0] || null
}

export async function findStoreByPhone(phone) {
    const result = await pool.query(`
        SELECT id, name, email, phone, currency_code, currency_symbol, image
        FROM stores
        WHERE phone = $1
    `, [phone])

    return result.rows[0] || null
}

export async function findStoreById(id) {
    const result = await pool.query(`
        SELECT id, name, email, phone, currency_code, currency_symbol, image
        FROM stores
        WHERE id = $1
    `, [id])

    return result.rows[0] || null
}

export async function insertStore({ name, email, password_hash, phone, image }) {
    const result = await pool.query(`
        INSERT INTO stores (name, email, password_hash, phone, image)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, currency_code, currency_symbol, image
    `, [name, email, password_hash, phone, image])

    return result.rows[0] || null
}

export async function findEmailCode(email) {
    const result = await pool.query(`
        SELECT email, code_hash, expires_at
        FROM email_verification_codes
        WHERE email = $1
    `, [email])

    return result.rows[0] || null
}

export async function insertEmailCode(data) {
    const { email, code_hash, expires_at } = data

    const result = await pool.query(`
        INSERT INTO email_verification_codes (email, code_hash, expires_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (email)
        DO UPDATE SET
            code_hash = $2,
            expires_at = $3,
            created_at = CURRENT_TIMESTAMP
        RETURNING email
    `, [email, code_hash, expires_at])

    return result.rows[0] || null
}

export async function removeEmailCode(email) {
    await pool.query(`
        DELETE FROM email_verification_codes
        WHERE email = $1
    `, [email])
}

export async function findPasswordResetCode(email) {
    const result = await pool.query(`
        SELECT email, code_hash, expires_at
        FROM password_reset_codes
        WHERE email = $1
    `, [email])

    return result.rows[0] || null
}

export async function insertPasswordResetCode(data) {
    const { email, code_hash, expires_at } = data

    const result = await pool.query(`
        INSERT INTO password_reset_codes (email, code_hash, expires_at)
        VALUES ($1, $2, $3)
        ON CONFLICT (email)
        DO UPDATE SET
            code_hash = $2,
            expires_at = $3,
            created_at = CURRENT_TIMESTAMP
        RETURNING email
    `, [email, code_hash, expires_at])

    return result.rows[0] || null
}

export async function removePasswordResetCode(email) {
    await pool.query(`
        DELETE FROM password_reset_codes
        WHERE email = $1
    `, [email])
}

export async function updateStorePasswordByEmail(data) {
    const { email, password_hash } = data

    const result = await pool.query(`
        UPDATE stores
        SET password_hash = $1
        WHERE email = $2
        RETURNING id, name, email, phone, currency_code, currency_symbol, image
    `, [password_hash, email])

    return result.rows[0] || null
}

