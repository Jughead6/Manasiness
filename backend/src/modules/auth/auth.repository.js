import pool from "../../config/db.js"

export async function findStoreByEmail(email) {
    const result = await pool.query(`
        SELECT id, name, email, password_hash, phone, image
        FROM stores
        WHERE email = $1
    `, [email])

    return result.rows[0] || null
}

export async function findStoreById(id) {
    const result = await pool.query(`
        SELECT id, name, email, phone, image
        FROM stores
        WHERE id = $1
    `, [id])

    return result.rows[0] || null
}

export async function insertStore({ name, email, password_hash, phone, image }) {
    const result = await pool.query(`
        INSERT INTO stores (name, email, password_hash, phone, image)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, image
    `, [name, email, password_hash, phone, image])

    return result.rows[0] || null
}