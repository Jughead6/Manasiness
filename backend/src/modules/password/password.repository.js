import pool from "../../config/db.js"

export async function findPasswordById(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT password_hash
        FROM stores
        WHERE id = $1
    `, [storeId])

    return result.rows[0] || null
}

export async function updatePassword(data) {
    const { storeId, passwordHash } = data

    const result = await pool.query(`
        UPDATE stores
        SET password_hash = $1
        WHERE id = $2
        RETURNING id
    `, [passwordHash, storeId])

    return result.rows[0] || null
}