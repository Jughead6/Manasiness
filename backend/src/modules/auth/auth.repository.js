import pool2 from "../../config/db2.js"

export async function findStoreByEmail(email) {
    const result = await pool2.query(`
        SELECT id, name, email, password_hash, phone, image
        FROM stores
        WHERE email = $1
    `, [email])

    return result.rows[0] || null
}

export async function insertStore({name, email, password_hash, phone, image}) {

    const result = await pool2.query(`
        INSERT INTO stores (name, email, password_hash, phone, image)
        VALUES($1, $2, $3, $4, $5)
        RETURNING id, name, email, phone, image
    `, [name, email, password_hash, phone, image])

    return result.rows[0] || null
}