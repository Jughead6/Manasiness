import pool from "../../config/db.js"

export async function findInformationStore(data) {
    const { storeId } = data

    const result = await pool.query(`
        SELECT name, email, phone, currency_code, currency_symbol, image
        FROM stores
        WHERE id = $1
    `, [storeId])

    return result.rows[0]
}

export async function updateInformationStore(data) {
    const { storeId, name, email, phone, currency_code, currency_symbol, cleanImage } = data

    const result = await pool.query(`
        UPDATE stores
        SET
            name = $1,
            email = $2,
            phone = $3,
            currency_code = $4,
            currency_symbol = $5,
            image = $6
        WHERE id = $7
        RETURNING name, email, phone, currency_code, currency_symbol, image
    `, [name, email, phone, currency_code, currency_symbol, cleanImage, storeId])

    return result.rows[0]
}
