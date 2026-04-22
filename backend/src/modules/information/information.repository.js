import pool from "../../config/db.js"

export async function findInformationStore(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT name, email, phone, image
        FROM stores
        WHERE id = $1
    `, [storeId])

    return result.rows[0]
}

export async function updateInformationStore(data) {
    const { storeId, name, email, phone, cleanImage } = data

    const result = await pool.query(`
        UPDATE stores
        SET
            name = $1,
            email = $2,
            phone = $3,
            image = $4
        WHERE id = $5
        RETURNING name, email, phone, image
    `, [name, email, phone, cleanImage, storeId])

    return result.rows[0]
}